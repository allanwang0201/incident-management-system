import type { Metadata } from 'next';
import { incidentService } from './incident-service';
import { HighPriorityIcon, MediumPriorityIcon, LowPriorityIcon } from '../img/PriorityIcons';
import { format, parseISO } from 'date-fns';
import type { IncidentWithLocation } from './types';
// Next.js key: App Router page file (/ route); default server component

export const metadata: Metadata = {
  // Next.js key: page-level metadata (server-generated) for SEO
  title: 'Incident Management - Real-time Incident Tracking',
  description: 'View and track all incidents across multiple locations. Monitor security, safety, and operational events in real-time.',
  keywords: 'incidents, security, safety, airport, emergency, real-time tracking',
  openGraph: {
    title: 'Incident Management Dashboard',
    description: 'Real-time incident tracking and management system',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Incident Management Dashboard',
    description: 'Real-time incident tracking and management system',
  },
};

// Server-side data fetching
async function getIncidents(): Promise<IncidentWithLocation[]> {
  try {
    const incidents = await incidentService.getAllIncidents();
    return incidents;
  } catch (error) {
    console.error('Failed to fetch incidents:', error);
    return [];
  }
}

export default async function IncidentsPage() {
  // Next.js key: SSR happens here; fetch data and output HTML
  const incidents = await getIncidents();
  
  return (
    <main>
      <div className="container">
        <div className="header">
          <h1>Incident Management Dashboard</h1>
          <p className="meta">Real-time incident tracking across all locations</p>
        </div>

        <div className="list">
          {incidents.map((incident) => (
            <div key={incident.id} className="card">
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                <span className="priority">
                  {incident.priority === 1 ? <HighPriorityIcon /> : incident.priority === 2 ? <MediumPriorityIcon /> : <LowPriorityIcon />}
                </span>
                <div style={{ flex: 1 }}>
                  {/* Next.js key: server-generated anchor to dynamic route /incidents/[id] */}
                  <div style={{ fontWeight: 600 }}>
                    <a href={`/incidents/${incident.id}`}>{incident.name}</a>
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
                  <a href={`/incidents/${incident.id}`}>{incident.name}</a>
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
    </main>
  );
}
