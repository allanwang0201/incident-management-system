import React from 'react';

export default function Home() {
  return (
    <div
      style={{
        padding: '2rem',
        fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif',
      }}
    >
      <h1>Incident Management API</h1>
      <p>This is the API backend for the Incident Management System.</p>

      <h2>Available Endpoints:</h2>
      <ul>
        <li>
          <code>GET /api/incidents</code> - Get all incidents
        </li>
        <li>
          <code>GET /api/incidents/[locationId]</code> - Get incidents by location ID
        </li>
        <li>
          <code>GET /api/locations</code> - Get all locations
        </li>
      </ul>
    </div>
  );
}
