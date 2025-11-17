import type { GetServerSideProps } from 'next';
import { incidentService } from '../../../app/incident-service';
import { HighPriorityIcon, MediumPriorityIcon, LowPriorityIcon } from '../../../img/PriorityIcons';
import { format, parseISO } from 'date-fns';
import React from 'react';

type IncidentWithLocation = {
  id: number;
  name: string;
  priority: 1 | 2 | 3;
  datetime: string;
  locationId: string;
  locationName: string;
  description?: string;
};

type Props = {
  incident: IncidentWithLocation;
};

export const getServerSideProps: GetServerSideProps<Props> = async ({ params }) => {
  const id = Number(params?.id);
  if (!id || Number.isNaN(id)) {
    return { notFound: true };
  }
  const incident = await incidentService.getIncidentById(id);
  if (!incident) {
    return { notFound: true };
  }
  return { props: { incident } };
};

export default function LegacyIncidentDetail({ incident }: Props) {
  const icon = incident.priority === 1 ? <HighPriorityIcon /> : incident.priority === 2 ? <MediumPriorityIcon /> : <LowPriorityIcon />;
  const label = incident.priority === 1 ? 'High' : incident.priority === 2 ? 'Medium' : 'Low';

  return (
    <main>
      <div className="container">
        <div className="header">
          <h1>Legacy SSR Incident #{incident.id}</h1>
          <p className="meta">Rendered via getServerSideProps</p>
        </div>

        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
            <span className="priority">{icon}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: 18 }}>{incident.name}</div>
              <div className="meta">Location: {incident.locationName}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontWeight: 700 }}>{label}</div>
              <div className="meta" style={{ whiteSpace: 'nowrap' }}>{format(parseISO(incident.datetime), 'M/d/yyyy, h:mm:ss a')}</div>
            </div>
          </div>
          {incident.description ? (
            <div className="meta" style={{ marginTop: 8 }}>{incident.description}</div>
          ) : null}
        </div>

        <div style={{ marginTop: 16 }}>
          <a href="/legacy">← Back to legacy list</a>
        </div>
      </div>

      <style>{`
        :root { --hover-bg: rgba(0, 0, 0, 0.04); }
        .container { max-width: 1024px; margin: 0 auto; padding: 32px; }
        .header { margin-bottom: 32px; }
        .card { border: 1px solid rgba(0,0,0,0.08); border-radius: 8px; padding: 12px; margin-bottom: 12px; transition: background-color 0.2s ease; }
        .card:hover { background-color: var(--hover-bg); }
        .priority { width: 24px; height: 24px; display: inline-block; }
        .meta { color: #666; }
      `}</style>
    </main>
  );
}

