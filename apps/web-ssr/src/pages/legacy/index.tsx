import type { GetServerSideProps } from 'next';
import { incidentService } from '../../app/incident-service';
import { format, parseISO } from 'date-fns';
import { HighPriorityIcon, MediumPriorityIcon, LowPriorityIcon } from '../../img/PriorityIcons';
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
  incidents: IncidentWithLocation[];
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const incidents = await incidentService.getAllIncidents();
  return { props: { incidents } };
};

export default function LegacyHome({ incidents }: Props) {
  return (
    <main>
      <div className="container">
        <div className="header">
          <h1>Legacy SSR (getServerSideProps)</h1>
          <p className="meta">This page is rendered using Next.js Pages Router.</p>
        </div>

        <div className="list">
          {incidents.map((incident) => (
            <div key={incident.id} className="card">
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                <span className="priority">
                  {incident.priority === 1 ? <HighPriorityIcon /> : incident.priority === 2 ? <MediumPriorityIcon /> : <LowPriorityIcon />}
                </span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600 }}>
                    <a href={`/legacy/incidents/${incident.id}`}>{incident.name}</a>
                  </div>
                  <div className="meta">#{incident.id} • {incident.locationName}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: 700 }}>{incident.priority === 1 ? 'High' : incident.priority === 2 ? 'Medium' : 'Low'}</div>
                  <div className="meta" style={{ whiteSpace: 'nowrap' }}>{format(parseISO(incident.datetime), 'M/d/yyyy, h:mm:ss a')}</div>
                </div>
              </div>
              {incident.description ? (
                <div className="meta" style={{ marginTop: 8 }}>{incident.description}</div>
              ) : null}
            </div>
          ))}
          {incidents.length === 0 ? (
            <div className="card" style={{ textAlign: 'center', padding: 32 }}>
              <span className="meta">No incidents found</span>
            </div>
          ) : null}
        </div>

        <table className="table">
          <thead>
            <tr>
              <th className="th" style={{ width: 60 }}>Priority</th>
              <th className="th">Date & Time</th>
              <th className="th">ID</th>
              <th className="th">Location</th>
              <th className="th">Incident Name</th>
              <th className="th">Description</th>
            </tr>
          </thead>
          <tbody>
            {incidents.map((incident) => (
              <tr key={incident.id} className="row">
                <td className="td">
                  <span className="priority">
                    {incident.priority === 1 ? <HighPriorityIcon /> : incident.priority === 2 ? <MediumPriorityIcon /> : <LowPriorityIcon />}
                  </span>
                </td>
                <td className="td">
                  <span style={{ whiteSpace: 'nowrap' }}>{format(parseISO(incident.datetime), 'M/d/yyyy, h:mm:ss a')}</span>
                </td>
                <td className="td">
                  <span className="meta">#{incident.id}</span>
                </td>
                <td className="td">{incident.locationName}</td>
                <td className="td" style={{ fontWeight: 500 }}>
                  <a href={`/legacy/incidents/${incident.id}`}>{incident.name}</a>
                </td>
                <td className="td">
                  <span className="meta">{incident.description || 'No description available'}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={{ marginTop: 16, textAlign: 'center' }}>
          <span className="meta">Total incidents: {incidents.length}</span>
        </div>
      </div>

      <style>{`
        :root { --hover-bg: rgba(0, 0, 0, 0.04); }
        .container { max-width: 1024px; margin: 0 auto; padding: 32px; }
        .header { margin-bottom: 32px; }
        .table { width: 100%; border-collapse: collapse; }
        .th, .td { padding: 12px 16px; border-bottom: 1px solid rgba(0,0,0,0.08); }
        .row:hover { background-color: var(--hover-bg); }
        .list { display: none; }
        .card { border: 1px solid rgba(0,0,0,0.08); border-radius: 8px; padding: 12px; margin-bottom: 12px; transition: background-color 0.2s ease; }
        .card:hover { background-color: var(--hover-bg); }
        .priority { width: 24px; height: 24px; display: inline-block; }
        .meta { color: #666; }
        @media (max-width: 600px) {
          .table { display: none; }
          .list { display: block; }
        }
      `}</style>
    </main>
  );
}

