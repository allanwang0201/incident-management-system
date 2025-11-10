import type { NextApiRequest, NextApiResponse } from 'next';
import { incidentService } from '@incident-system/shared';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const incidents = await incidentService.getAllIncidents();
      res.status(200).json(incidents);
    } catch (error) {
      res.status(500).json({
        error: 'Failed to fetch incidents',
        message: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
