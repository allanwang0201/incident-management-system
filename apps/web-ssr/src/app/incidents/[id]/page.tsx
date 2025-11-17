import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { incidentService } from '../../incident-service';
import { HighPriorityIcon, MediumPriorityIcon, LowPriorityIcon } from '../../../img/PriorityIcons';
import { format, parseISO } from 'date-fns';
// import type { IncidentWithLocation } from '../../types';

// Next.js key: dynamic route page (/incidents/[id]); default server component
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  // Next.js key: generate SEO metadata dynamically from data
  const id = Number(params.id);
  const incident = await incidentService.getIncidentById(id);
  if (!incident) {
    return { title: 'Incident Not Found' };
  }
  return {
    title: `${incident.name} - Incident #${incident.id}`,
    description: `Priority ${incident.priority}, at ${incident.locationName} on ${format(parseISO(incident.datetime), 'M/d/yyyy, h:mm:ss a')}`,
    openGraph: {
      title: `${incident.name} - Incident #${incident.id}`,
      description: `Incident details at ${incident.locationName}`,
      type: 'article',
    },
  };
}

export default async function IncidentDetailPage({ params }: { params: { id: string } }) {
  // Next.js key: fetch detail data during server-side rendering
  const id = Number(params.id);
  const incident = await incidentService.getIncidentById(id);
  if (!incident) {
    notFound();
  }

  const icon = incident!.priority === 1 ? <HighPriorityIcon /> : incident!.priority === 2 ? <MediumPriorityIcon /> : <LowPriorityIcon />;
  const label = incident!.priority === 1 ? 'High' : incident!.priority === 2 ? 'Medium' : 'Low';

  return (
    <main>
      <div className="container">
        <div className="header">
          <h1>Incident #{incident!.id}</h1>
          <p className="meta">Detailed information about the incident</p>
        </div>

        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
            <span className="priority">{icon}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: 18 }}>{incident!.name}</div>
              <div className="meta">Location: {incident!.locationName}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontWeight: 700 }}>{label}</div>
              <div className="meta" style={{ whiteSpace: 'nowrap' }}>{format(parseISO(incident!.datetime), 'M/d/yyyy, h:mm:ss a')}</div>
            </div>
          </div>
          {incident!.description ? (
            <div className="meta" style={{ marginTop: 8 }}>{incident!.description}</div>
          ) : null}
        </div>

        <div style={{ marginTop: 16 }}>
          <a href="/">← Back to list</a>
        </div>
      </div>
    </main>
  );
}
