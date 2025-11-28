import type { NextApiRequest, NextApiResponse } from 'next';

const SESSION_COOKIE = 'admin_session';
const ONE_WEEK_SECONDS = 60 * 60 * 24 * 7;

function getSessionToken() {
  const token = process.env.ADMIN_SESSION_TOKEN;
  if (!token) {
    throw new Error('ADMIN_SESSION_TOKEN is not configured');
  }
  return token;
}

export function isAdminAuthenticated(req: NextApiRequest) {
  return req.cookies?.[SESSION_COOKIE] === getSessionToken();
}

function buildCookieHeader(value: string, maxAge?: number) {
  const parts = [`${SESSION_COOKIE}=${value}`];
  parts.push('Path=/');
  parts.push('HttpOnly');
  parts.push('SameSite=Strict');
  if (process.env.NODE_ENV === 'production') {
    parts.push('Secure');
  }
  if (typeof maxAge === 'number') {
    parts.push(`Max-Age=${maxAge}`);
  }
  return parts.join('; ');
}

export function setAdminSession(res: NextApiResponse) {
  const token = getSessionToken();
  res.setHeader('Set-Cookie', buildCookieHeader(token, ONE_WEEK_SECONDS));
}

export function clearAdminSession(res: NextApiResponse) {
  res.setHeader('Set-Cookie', buildCookieHeader('', 0));
}

export function requireAdmin(req: NextApiRequest, res: NextApiResponse) {
  if (!isAdminAuthenticated(req)) {
    res.status(401).json({ message: 'Unauthorized' });
    return false;
  }
  return true;
}

