import type { NextApiRequest, NextApiResponse } from 'next';
import { setAdminSession } from '@/utils/adminAuth';

function getCredentials() {
  const username = process.env.ADMIN_USERNAME;
  const password = process.env.ADMIN_PASSWORD;

  if (!username || !password) {
    throw new Error('ADMIN_USERNAME and ADMIN_PASSWORD must be configured');
  }

  return { username, password };
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }

  try {
    const { username, password } = getCredentials();
    const { username: bodyUser, password: bodyPass } = req.body ?? {};

    if (bodyUser === username && bodyPass === password) {
      setAdminSession(res);
      return res.status(200).json({ message: 'Logged in' });
    }

    return res.status(401).json({ message: 'Invalid credentials' });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unexpected error';
    return res.status(400).json({ message });
  }
}

