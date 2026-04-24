# syntax=docker/dockerfile:1.7
#
# Multi-stage Dockerfile for the Nuxt 4 web-profile app.
#
# Stage 1 (builder): installs full dependencies and runs `nuxt build`, which
#   produces a self-contained Nitro output under `.output/` — Nitro bundles
#   every imported server dependency (including `redis`) into
#   `.output/server/node_modules`, so the runtime stage does not need to run
#   `yarn install` again.
#
# Stage 2 (runner): ships only the `.output/` bundle on a slim Node image and
#   listens on $PORT (8080 by default) as Cloud Run expects.

ARG NODE_VERSION=22.14.0

# ---------- builder ----------
FROM node:${NODE_VERSION}-alpine AS builder

# libc6-compat fixes native-module compatibility on Alpine (e.g. lightningcss,
# esbuild binaries used by Nuxt/Vite during build).
RUN apk add --no-cache libc6-compat

WORKDIR /app

# Install deps first (better layer caching).
COPY package.json yarn.lock ./
RUN --mount=type=cache,target=/usr/local/share/.cache/yarn \
    yarn install --frozen-lockfile --network-timeout 600000

# Copy the rest of the source and build.
COPY . .

ENV NODE_ENV=production \
    NUXT_TELEMETRY_DISABLED=1

RUN yarn build


# ---------- runner ----------
FROM node:${NODE_VERSION}-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production \
    NUXT_TELEMETRY_DISABLED=1 \
    HOST=0.0.0.0 \
    PORT=8080 \
    NITRO_HOST=0.0.0.0 \
    NITRO_PORT=8080

# Copy the self-contained Nitro output from the builder. No further install
# needed — `.output/server/node_modules` already contains every runtime dep.
COPY --from=builder --chown=node:node /app/.output ./.output

# Run as the unprivileged `node` user shipped in the official image.
USER node

EXPOSE 8080

CMD ["node", ".output/server/index.mjs"]
