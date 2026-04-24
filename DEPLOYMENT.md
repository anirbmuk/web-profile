# Deployment — Cloud Run + Memorystore

The app is deployed to Google Cloud Run as a container, with Redis running on
GCP Memorystore. The build-and-deploy pipeline lives in
`.github/workflows/deploy.yml`; this document covers the one-time infra that
workflow depends on.

## Architecture

```
GitHub push to main
        │
        ▼
GitHub Actions (WIF)
        │
        ├── docker build & push ──▶ Artifact Registry (web-profile repo)
        │
        └── gcloud run deploy ─────▶ Cloud Run service (web-profile)
                                              │
                                              │  Serverless VPC connector
                                              ▼
                                     Memorystore Redis (private IP)
```

Cloud Run cannot talk to Memorystore directly — all traffic to Memorystore's
private IP goes through a **Serverless VPC Access connector**.

## One-time GCP setup

Replace `PROJECT_ID` and `REGION` with your values (e.g. `anirbmuk` and
`us-central1`). All commands assume `gcloud config set project PROJECT_ID` is
already done.

### 1. Enable APIs

```bash
gcloud services enable \
  artifactregistry.googleapis.com \
  run.googleapis.com \
  redis.googleapis.com \
  vpcaccess.googleapis.com \
  secretmanager.googleapis.com \
  iamcredentials.googleapis.com
```

### 2. Artifact Registry repository

```bash
gcloud artifacts repositories create web-profile \
  --repository-format=docker \
  --location=REGION \
  --description="Nuxt web-profile container images"
```

### 3. Memorystore (Redis) instance

Smallest tier is plenty for a portfolio site.

```bash
gcloud redis instances create web-profile-cache \
  --size=1 \
  --region=REGION \
  --redis-version=redis_7_2 \
  --tier=basic
```

Grab the private host IP — you'll set it as `NUXT_REDIS_HOST`:

```bash
gcloud redis instances describe web-profile-cache \
  --region=REGION --format='value(host)'
```

And note the authorized network (defaults to `default`) — the VPC connector
must live on the same VPC.

### 4. Serverless VPC connector

Cloud Run uses this to reach Memorystore's private IP.

```bash
gcloud compute networks vpc-access connectors create web-profile-connector \
  --region=REGION \
  --network=default \
  --range=10.8.0.0/28
```

### 5. Firebase secrets in Secret Manager

The workflow reads Firebase config from Secret Manager (not plain env vars).
Create one secret per value:

```bash
for NAME in \
  NUXT_FIREBASE_API_KEY \
  NUXT_FIREBASE_AUTH_DOMAIN \
  NUXT_FIREBASE_PROJECT_ID \
  NUXT_FIREBASE_STORAGE_BUCKET \
  NUXT_FIREBASE_MESSAGING_SENDER_ID \
  NUXT_FIREBASE_APP_ID \
  NUXT_FIREBASE_MEASUREMENT_ID
do
  printf "REPLACE_ME" | gcloud secrets create "$NAME" --data-file=-
done
```

Then update each with the real value:

```bash
printf "actual-value" | gcloud secrets versions add NUXT_FIREBASE_API_KEY --data-file=-
```

### 6. Deployer service account

```bash
SA=github-deployer@PROJECT_ID.iam.gserviceaccount.com

gcloud iam service-accounts create github-deployer \
  --display-name="GitHub Actions deployer"

# Cloud Run admin + ability to deploy new revisions
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member="serviceAccount:${SA}" --role=roles/run.admin

# Act as the Cloud Run runtime SA
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member="serviceAccount:${SA}" --role=roles/iam.serviceAccountUser

# Push to Artifact Registry
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member="serviceAccount:${SA}" --role=roles/artifactregistry.writer

# Read Firebase secrets at deploy time (Cloud Run runtime also needs this,
# but it's inherited if you use the default compute SA as runtime SA).
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member="serviceAccount:${SA}" --role=roles/secretmanager.secretAccessor
```

The **Cloud Run runtime** service account (the default compute SA unless you
override it) must also have `roles/secretmanager.secretAccessor` so it can
read the mounted secrets at request time.

### 7. Workload Identity Federation (no JSON keys)

```bash
# Create the pool
gcloud iam workload-identity-pools create github \
  --location=global --display-name="GitHub Actions"

# Create the provider bound to the GitHub OIDC issuer
gcloud iam workload-identity-pools providers create-oidc github \
  --location=global \
  --workload-identity-pool=github \
  --display-name="GitHub OIDC" \
  --attribute-mapping='google.subject=assertion.sub,attribute.repository=assertion.repository,attribute.repository_owner=assertion.repository_owner' \
  --attribute-condition='attribute.repository_owner == "anirbmuk"' \
  --issuer-uri='https://token.actions.githubusercontent.com'

# Let the GitHub repo impersonate the deployer SA
PROJECT_NUMBER=$(gcloud projects describe PROJECT_ID --format='value(projectNumber)')

gcloud iam service-accounts add-iam-policy-binding \
  github-deployer@PROJECT_ID.iam.gserviceaccount.com \
  --role=roles/iam.workloadIdentityUser \
  --member="principalSet://iam.googleapis.com/projects/${PROJECT_NUMBER}/locations/global/workloadIdentityPools/github/attribute.repository/anirbmuk/web-profile"
```

The provider resource name (used below as `GCP_WORKLOAD_IDENTITY_PROVIDER`) is:

```
projects/PROJECT_NUMBER/locations/global/workloadIdentityPools/github/providers/github
```

## GitHub configuration

In the repo → **Settings → Secrets and variables → Actions**:

### Secrets

| Name                               | Value                                                     |
| ---------------------------------- | --------------------------------------------------------- |
| `GCP_WORKLOAD_IDENTITY_PROVIDER`   | `projects/…/workloadIdentityPools/github/providers/github` |
| `GCP_DEPLOY_SERVICE_ACCOUNT`       | `github-deployer@PROJECT_ID.iam.gserviceaccount.com`      |

### Variables

| Name                                           | Example                      |
| ---------------------------------------------- | ---------------------------- |
| `GCP_PROJECT_ID`                               | `anirbmuk`                   |
| `GCP_REGION`                                   | `us-central1`                |
| `AR_REPOSITORY`                                | `web-profile`                |
| `CLOUD_RUN_SERVICE`                            | `web-profile`                |
| `GCP_VPC_CONNECTOR`                            | `web-profile-connector`      |
| `NUXT_REDIS_HOST`                              | (private IP from step 3)     |
| `NUXT_REDIS_PORT`                              | `6379`                       |
| `NUXT_REDIS_PREFIX`                            | `webprofile`                 |
| `NUXT_PUBLIC_APP_ENV`                          | `production`                 |
| `NUXT_PUBLIC_BASE_URL`                         | `https://anirbmuk.dev`       |
| `DEFAULT_DOMAIN`                               | `anirbmuk.dev`               |
| `NUXT_PUBLIC_API_BASE_PATH`                    | `/api`                       |
| `NUXT_PUBLIC_OFFLINE_MODE`                     | `false`                      |
| `NUXT_PUBLIC_GOOGLE_SITE_VERIFICATION`         | …                            |
| `NUXT_PUBLIC_GTM_ID`                           | …                            |
| `NUXT_PUBLIC_GTM_DEBUG`                        | `false`                      |
| `NUXT_PUBLIC_GTM_ENABLED`                      | `true`                       |
| `NUXT_PUBLIC_SCRIPTS_GOOGLE_TAG_MANAGER_ID`    | …                            |
| `NUXT_SITEMAP_SOURCE_URL`                      | …                            |

## Local container testing

```bash
yarn docker:build                       # build image as web-profile:local
yarn docker:run                         # run on :8080 using .env values
open http://localhost:8080
```

`yarn docker:run` loads your `.env` (which has `NUXT_REDIS_HOST=127.0.0.1`),
so have a local Redis running:

```bash
docker run -d --name dev-redis -p 6379:6379 redis:7-alpine
```

On macOS the container reaches your host Redis via `host.docker.internal`; if
you need that, run with:

```bash
docker run --rm -p 8080:8080 --env-file .env \
  -e NUXT_REDIS_HOST=host.docker.internal \
  web-profile:local
```

## Rollback

```bash
gcloud run services update-traffic web-profile \
  --region=REGION --to-revisions=web-profile-00042-abc=100
```

List revisions with:

```bash
gcloud run revisions list --service=web-profile --region=REGION
```
