import type { NextApiRequest, NextApiResponse } from 'next';
import { incidentService } from '@incident-system/shared';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { locationId } = req.query;

  if (req.method === 'GET') {
    if (!locationId || typeof locationId !== 'string') {
      return res.status(400).json({ error: 'Location ID is required' });
    }

    try {
      const incidents = await incidentService.getIncidentsByLocationId(locationId);
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
