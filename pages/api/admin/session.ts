import type { NextApiRequest, NextApiResponse } from 'next';
import { isAdminAuthenticated } from '@/utils/adminAuth';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const authenticated = isAdminAuthenticated(req);
  return res.status(200).json({ authenticated });
}

