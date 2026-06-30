import React from 'react';

/* Tiled travel-doodle pattern (small scale) for use as a faint section backdrop. */
export default function TravelDoodles({
  opacity = 0.05,
  uid = 'travel-doodle',
}: {
  opacity?: number;
  uid?: string;
}) {
  return (
    <div
      className="pointer-events-none absolute inset-0"
      style={{ opacity }}
      aria-hidden="true"
    >
      <svg width="100%" height="100%" preserveAspectRatio="xMidYMid">
        <defs>
          <pattern id={uid} width="120" height="156" patternUnits="userSpaceOnUse" patternTransform="scale(0.6)">
            <g fill="none" stroke="#0f172a" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              {/* Airplane */}
              <g transform="translate(4,8) rotate(-6)">
                <path d="M2 16l30-3-5-9 5 1 9 8 9-1c3 0 3 3 0 3l-9-1-9 8-5 1 5-9z" />
                <path d="M10 14l-4 4M14 15l-3 4" />
              </g>
              {/* Compass rose */}
              <g transform="translate(78,4)">
                <path d="M10 0l3 9 9 3-9 3-3 9-3-9-9-3 9-3z" />
                <path d="M10 4l1.5 5.5L17 11l-5.5 1.5L10 17l-1.5-4.5L3 11l5.5-1.5z" fill="#0f172a" />
              </g>
              {/* Palm tree */}
              <g transform="translate(8,44)">
                <path d="M12 38V14" />
                <path d="M12 14C12 6 5 2 0 4M12 14C12 6 19 2 24 4M12 14C7 8 2 9 0 14M12 14c5-6 10-5 12 0M12 14C12 7 9 3 6 1M12 14c0-7 3-11 6-13" />
              </g>
              {/* Cloud */}
              <g transform="translate(72,52)">
                <path d="M4 14c-3 0-4-2-4-4s2-4 4-3c0-3 4-5 7-3 2-2 6-1 6 2 3 0 4 3 2 5z" />
              </g>
              {/* X mark */}
              <path d="M54 40l7 7M61 40l-7 7" strokeWidth="2.2" />
              {/* Star */}
              <path d="M44 86l1.6 3.6 3.9.3-3 2.6.9 3.8-3.4-2-3.4 2 .9-3.8-3-2.6 3.9-.3z" />
              {/* Suitcase */}
              <g transform="translate(6,92) rotate(4)">
                <rect x="0" y="6" width="26" height="30" rx="3" />
                <path d="M9 6V2h8v4" />
                <path d="M0 16h26" />
                <path d="M16 22l4 4-4 4-4-4z" />
              </g>
              {/* Smiley sun */}
              <g transform="translate(78,96)">
                <circle cx="11" cy="11" r="6" />
                <path d="M11 0v3M11 19v3M0 11h3M19 11h3M3 3l2 2M17 17l2 2M19 3l-2 2M3 19l2-2" />
                <path d="M9 10v1M13 10v1M9 13c1 1 3 1 4 0" />
              </g>
              {/* Location pin */}
              <g transform="translate(54,118)">
                <path d="M6 0a6 6 0 0 1 6 6c0 5-6 12-6 12S0 11 0 6a6 6 0 0 1 6-6z" />
                <circle cx="6" cy="6" r="2.2" />
              </g>
              {/* Ticket */}
              <g transform="translate(2,134) rotate(-4)">
                <path d="M0 4a2 2 0 0 1 2-2h34a2 2 0 0 1 2 2v3a2 2 0 0 0 0 4v3a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-3a2 2 0 0 0 0-4z" />
                <text x="8" y="13" fill="#0f172a" stroke="none" fontFamily="'Comic Sans MS',cursive" fontSize="6" fontWeight="700">TICKET</text>
              </g>
              {/* Phone */}
              <g transform="translate(90,128) rotate(8)">
                <rect x="0" y="0" width="14" height="26" rx="3" />
                <circle cx="7" cy="22" r="1.1" fill="#0f172a" />
              </g>
              {/* Dashed route curves */}
              <path d="M0 30C20 24 30 38 50 32" strokeDasharray="1 5" />
              <path d="M60 70C80 64 92 80 116 72" strokeDasharray="1 5" />
              <path d="M0 116C24 110 30 126 48 120" strokeDasharray="1 5" />
            </g>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${uid})`} />
      </svg>
    </div>
  );
}
