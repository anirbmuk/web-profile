import type { H3Event } from 'h3';

const WWW_AUTHENTICATE_HEADER = 'WWW-Authenticate';
const WWW_AUTHENTICATE_VALUE = 'Basic realm="API"';
const UNAUTHORIZED = 'Unauthorized';

function rejectUnauthorized(event: H3Event): never {
  setResponseHeader(event, WWW_AUTHENTICATE_HEADER, WWW_AUTHENTICATE_VALUE);
  throw createError({
    statusCode: 401,
    statusMessage: UNAUTHORIZED, 
  });
}

export function requireBasicAuth(event: H3Event): void {
  const config = useRuntimeConfig();
  const expectedUsername = config.apiUsername as string;
  const expectedPassword = config.apiPassword as string;

  if (!expectedUsername || !expectedPassword) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Server misconfiguration: API credentials are not set',
    });
  }

  const authHeader = getRequestHeader(event, 'authorization');

  if (!authHeader?.startsWith('Basic ')) {
    rejectUnauthorized(event);
  }

  const base64Credentials = authHeader.slice(6); // strip "Basic "
  const decoded = Buffer.from(base64Credentials, 'base64').toString('utf-8');
  const separatorIndex = decoded.indexOf(':');

  if (separatorIndex === -1) {
    rejectUnauthorized(event);
  }

  const username = decoded.slice(0, separatorIndex);
  const password = decoded.slice(separatorIndex + 1);

  if (username !== expectedUsername || password !== expectedPassword) {
    rejectUnauthorized(event);
  }
}
