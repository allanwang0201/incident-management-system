import React from 'react';

export const HighPriorityIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="24" height="24" {...props}>
    <circle cx="12" cy="12" r="10" fill="#FF2727" />
    <text x="12" y="16" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="700">!</text>
  </svg>
);

export const MediumPriorityIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="24" height="24" {...props}>
    <circle cx="12" cy="12" r="10" fill="#FFC627" />
    <text x="12" y="16" textAnchor="middle" fill="#000000" fontSize="12" fontWeight="700">?</text>
  </svg>
);

export const LowPriorityIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="24" height="24" {...props}>
    <circle cx="12" cy="12" r="10" fill="#27C6FF" />
    <text x="12" y="16" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="700">i</text>
  </svg>
);
