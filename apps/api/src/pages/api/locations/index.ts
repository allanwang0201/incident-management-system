import type { NextApiRequest, NextApiResponse } from 'next';
import { incidentService } from '@incident-system/shared';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const locations = await incidentService.getLocations();
      res.status(200).json(locations);
    } catch (error) {
      res.status(500).json({
        error: 'Failed to fetch locations',
        message: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
