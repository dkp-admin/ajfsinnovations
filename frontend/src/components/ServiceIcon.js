import React from 'react';
import './ServiceIcon.css';

function ServiceIcon({ serviceId, title }) {
  const icons = {
    1: ( // Landing Zone Development
      <svg viewBox="0 0 200 200" className="service-icon-svg">
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#2563eb', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#1d4ed8', stopOpacity: 1 }} />
          </linearGradient>
        </defs>
        <rect width="200" height="200" fill="#f0f4ff" rx="16" />
        
        {/* Cloud shape */}
        <path d="M 70 80 Q 50 80 50 100 Q 50 115 70 115 L 130 115 Q 150 115 150 100 Q 150 80 130 80 Q 125 65 110 65 Q 95 50 80 60 Q 70 70 70 80 Z" fill="url(#grad1)" stroke="#2563eb" strokeWidth="2" />
        
        {/* Shield/folder layers inside cloud */}
        <rect x="75" y="85" width="50" height="25" rx="3" fill="white" stroke="#2563eb" strokeWidth="1.5" opacity="0.8" />
        <line x1="75" y1="97" x2="125" y2="97" stroke="#2563eb" strokeWidth="1" opacity="0.6" />
        <rect x="80" y="102" width="40" height="3" fill="#2563eb" opacity="0.4" />
      </svg>
    ),

    2: ( // Cloud Adoption
      <svg viewBox="0 0 200 200" className="service-icon-svg">
        <defs>
          <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#2563eb', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#1d4ed8', stopOpacity: 1 }} />
          </linearGradient>
        </defs>
        <rect width="200" height="200" fill="#f0f4ff" rx="16" />
        
        {/* Cloud */}
        <path d="M 60 100 Q 50 100 50 110 Q 50 125 70 125 L 130 125 Q 150 125 150 110 Q 150 100 140 100 Q 135 85 120 85 Q 105 75 90 85 Q 80 95 80 100 Z" fill="url(#grad2)" stroke="#2563eb" strokeWidth="2" />
        
        {/* Upward arrow */}
        <line x1="100" y1="130" x2="100" y2="60" stroke="#2563eb" strokeWidth="3" markerEnd="url(#arrowup)" />
        <defs>
          <marker id="arrowup" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
            <polygon points="0 10, 5 0, 10 10" fill="#2563eb" />
          </marker>
        </defs>
        
        {/* Plus sign for growth */}
        <circle cx="100" cy="60" r="8" fill="white" stroke="#2563eb" strokeWidth="2" />
        <line x1="100" y1="54" x2="100" y2="66" stroke="#2563eb" strokeWidth="2" />
        <line x1="94" y1="60" x2="106" y2="60" stroke="#2563eb" strokeWidth="2" />
      </svg>
    ),

    3: ( // Cloud Migration
      <svg viewBox="0 0 200 200" className="service-icon-svg">
        <defs>
          <linearGradient id="grad3a" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#dc2626', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#b91c1c', stopOpacity: 1 }} />
          </linearGradient>
          <linearGradient id="grad3b" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#16a34a', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#15803d', stopOpacity: 1 }} />
          </linearGradient>
        </defs>
        <rect width="200" height="200" fill="#f0f4ff" rx="16" />
        
        {/* On-prem cloud (left) */}
        <path d="M 40 110 Q 30 110 30 120 Q 30 135 50 135 L 80 135 Q 90 135 90 125 Q 90 115 80 115 Q 75 100 60 100 Q 45 90 40 100 Q 35 105 40 110 Z" fill="url(#grad3a)" stroke="#dc2626" strokeWidth="2" />
        
        {/* Arrow pointing right */}
        <line x1="100" y1="122" x2="150" y2="122" stroke="#2563eb" strokeWidth="3" markerEnd="url(#arrowright)" />
        <defs>
          <marker id="arrowright" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
            <polygon points="0 0, 10 3, 0 6" fill="#2563eb" />
          </marker>
        </defs>
        
        {/* Cloud cloud (right) */}
        <path d="M 150 110 Q 160 110 160 120 Q 160 135 140 135 L 110 135 Q 100 135 100 125 Q 100 115 110 115 Q 115 100 130 100 Q 145 90 150 100 Q 155 105 150 110 Z" fill="url(#grad3b)" stroke="#16a34a" strokeWidth="2" />
      </svg>
    ),

    4: ( // Application Modernization
      <svg viewBox="0 0 200 200" className="service-icon-svg">
        <defs>
          <linearGradient id="grad4" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#2563eb', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#1d4ed8', stopOpacity: 1 }} />
          </linearGradient>
        </defs>
        <rect width="200" height="200" fill="#f0f4ff" rx="16" />
        
        {/* Modern app window/blocks */}
        <rect x="50" y="60" width="100" height="80" rx="6" fill="none" stroke="url(#grad4)" strokeWidth="2" />
        
        {/* Header bar */}
        <rect x="50" y="60" width="100" height="18" rx="6" fill="url(#grad4)" />
        <circle cx="58" cy="69" r="2" fill="white" />
        <circle cx="66" cy="69" r="2" fill="white" />
        <circle cx="74" cy="69" r="2" fill="white" />
        
        {/* Content blocks (microservices) */}
        <rect x="60" y="85" width="20" height="20" fill="url(#grad4)" opacity="0.6" rx="2" />
        <rect x="90" y="85" width="20" height="20" fill="url(#grad4)" opacity="0.6" rx="2" />
        <rect x="120" y="85" width="20" height="20" fill="url(#grad4)" opacity="0.6" rx="2" />
        
        <rect x="60" y="115" width="20" height="15" fill="url(#grad4)" opacity="0.4" rx="2" />
        <rect x="90" y="115" width="20" height="15" fill="url(#grad4)" opacity="0.4" rx="2" />
        <rect x="120" y="115" width="20" height="15" fill="url(#grad4)" opacity="0.4" rx="2" />
      </svg>
    ),

    5: ( // Infrastructure Modernization
      <svg viewBox="0 0 200 200" className="service-icon-svg">
        <defs>
          <linearGradient id="grad5" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#2563eb', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#1d4ed8', stopOpacity: 1 }} />
          </linearGradient>
        </defs>
        <rect width="200" height="200" fill="#f0f4ff" rx="16" />
        
        {/* Server stack */}
        <rect x="60" y="65" width="80" height="18" rx="2" fill="url(#grad5)" stroke="#2563eb" strokeWidth="1.5" />
        <circle cx="75" cy="74" r="3" fill="white" />
        <circle cx="100" cy="74" r="3" fill="white" />
        <circle cx="125" cy="74" r="3" fill="white" />
        
        <rect x="60" y="90" width="80" height="18" rx="2" fill="url(#grad5)" opacity="0.7" stroke="#2563eb" strokeWidth="1.5" />
        <circle cx="75" cy="99" r="3" fill="white" opacity="0.8" />
        <circle cx="100" cy="99" r="3" fill="white" opacity="0.8" />
        <circle cx="125" cy="99" r="3" fill="white" opacity="0.8" />
        
        <rect x="60" y="115" width="80" height="18" rx="2" fill="url(#grad5)" opacity="0.5" stroke="#2563eb" strokeWidth="1.5" />
        <circle cx="75" cy="124" r="3" fill="white" opacity="0.6" />
        <circle cx="100" cy="124" r="3" fill="white" opacity="0.6" />
        <circle cx="125" cy="124" r="3" fill="white" opacity="0.6" />
        
        {/* Transformation arrow */}
        <path d="M 145 95 Q 160 90 170 110" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" />
        <polygon points="175 115, 172 105, 165 110" fill="#16a34a" />
      </svg>
    ),

    6: ( // Refactoring using IaaS Approach
      <svg viewBox="0 0 200 200" className="service-icon-svg">
        <defs>
          <linearGradient id="grad6" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#ca8a04', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#92400e', stopOpacity: 1 }} />
          </linearGradient>
        </defs>
        <rect width="200" height="200" fill="#fef08a" opacity="0.2" rx="16" />
        
        {/* VM/Server boxes with optimization */}
        <rect x="50" y="70" width="35" height="40" rx="3" fill="url(#grad6)" stroke="#ca8a04" strokeWidth="1.5" />
        <circle cx="67" cy="80" r="2.5" fill="white" opacity="0.7" />
        <circle cx="67" cy="88" r="2.5" fill="white" opacity="0.7" />
        <circle cx="67" cy="96" r="2.5" fill="white" opacity="0.7" />
        
        <rect x="95" y="70" width="35" height="40" rx="3" fill="url(#grad6)" stroke="#ca8a04" strokeWidth="1.5" />
        <circle cx="112" cy="80" r="2.5" fill="white" opacity="0.7" />
        <circle cx="112" cy="88" r="2.5" fill="white" opacity="0.7" />
        <circle cx="112" cy="96" r="2.5" fill="white" opacity="0.7" />
        
        {/* Optimization arrows */}
        <path d="M 58 115 Q 58 125 68 130" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" markerEnd="url(#arrowopt1)" />
        <path d="M 142 115 Q 142 125 132 130" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" markerEnd="url(#arrowopt2)" />
        
        <defs>
          <marker id="arrowopt1" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill="#2563eb" />
          </marker>
          <marker id="arrowopt2" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="180">
            <polygon points="0 0, 8 3, 0 6" fill="#2563eb" />
          </marker>
        </defs>
        
        {/* Efficiency symbol */}
        <circle cx="100" cy="145" r="12" fill="none" stroke="#2563eb" strokeWidth="2" />
        <text x="100" y="151" textAnchor="middle" fill="#2563eb" fontSize="18" fontWeight="bold">⚡</text>
      </svg>
    ),

    7: ( // Cloud Frontend Development
      <svg viewBox="0 0 200 200" className="service-icon-svg">
        <defs>
          <linearGradient id="grad7" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#2563eb', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#1d4ed8', stopOpacity: 1 }} />
          </linearGradient>
        </defs>
        <rect width="200" height="200" fill="#f0f4ff" rx="16" />
        
        {/* Browser window */}
        <rect x="45" y="55" width="110" height="80" rx="6" fill="white" stroke="url(#grad7)" strokeWidth="2" />
        
        {/* Browser chrome */}
        <rect x="45" y="55" width="110" height="18" rx="6" fill="url(#grad7)" />
        <circle cx="54" cy="64" r="2" fill="white" />
        <circle cx="62" cy="64" r="2" fill="white" />
        <circle cx="70" cy="64" r="2" fill="white" />
        
        {/* Content - UI blocks */}
        <rect x="55" y="80" width="35" height="12" fill="url(#grad7)" opacity="0.3" rx="2" />
        <rect x="55" y="98" width="28" height="8" fill="url(#grad7)" opacity="0.2" rx="2" />
        <rect x="55" y="110" width="28" height="8" fill="url(#grad7)" opacity="0.2" rx="2" />
        
        <rect x="95" y="78" width="40" height="35" fill="url(#grad7)" opacity="0.4" rx="3" />
        
        {/* Cloud integration symbol */}
        <circle cx="100" cy="150" r="8" fill="url(#grad7)" opacity="0.6" />
        <path d="M 92 150 L 108 150" stroke="url(#grad7)" strokeWidth="1.5" />
        <path d="M 100 142 L 100 158" stroke="url(#grad7)" strokeWidth="1.5" />
      </svg>
    ),

    8: ( // Cloud Backend Development
      <svg viewBox="0 0 200 200" className="service-icon-svg">
        <defs>
          <linearGradient id="grad8" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#2563eb', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#1d4ed8', stopOpacity: 1 }} />
          </linearGradient>
        </defs>
        <rect width="200" height="200" fill="#f0f4ff" rx="16" />
        
        {/* Server/API box */}
        <rect x="55" y="65" width="90" height="70" rx="6" fill="url(#grad8)" opacity="0.1" stroke="url(#grad8)" strokeWidth="2" />
        
        {/* Server units */}
        <rect x="65" y="75" width="35" height="20" fill="url(#grad8)" stroke="white" strokeWidth="1.5" rx="3" />
        <circle cx="75" cy="85" r="2.5" fill="white" />
        <circle cx="85" cy="85" r="2.5" fill="white" />
        
        <rect x="100" y="75" width="35" height="20" fill="url(#grad8)" opacity="0.7" stroke="white" strokeWidth="1.5" rx="3" />
        <circle cx="110" cy="85" r="2.5" fill="white" opacity="0.8" />
        <circle cx="120" cy="85" r="2.5" fill="white" opacity="0.8" />
        
        {/* Connection lines */}
        <line x1="82" y1="95" x2="82" y2="110" stroke="url(#grad8)" strokeWidth="1.5" />
        <line x1="117" y1="95" x2="117" y2="110" stroke="url(#grad8)" strokeWidth="1.5" />
        
        {/* Database */}
        <ellipse cx="100" cy="115" rx="25" ry="12" fill="url(#grad8)" opacity="0.5" stroke="url(#grad8)" strokeWidth="1.5" />
        <text x="100" y="120" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">API</text>
      </svg>
    ),

    9: ( // Software Development
      <svg viewBox="0 0 200 200" className="service-icon-svg">
        <defs>
          <linearGradient id="grad9" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#2563eb', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#1d4ed8', stopOpacity: 1 }} />
          </linearGradient>
        </defs>
        <rect width="200" height="200" fill="#f0f4ff" rx="16" />
        
        {/* Laptop screen */}
        <rect x="50" y="60" width="100" height="65" rx="4" fill="url(#grad9)" stroke="#2563eb" strokeWidth="2" />
        
        {/* Screen content - code brackets */}
        <text x="65" y="85" fill="white" fontSize="18" fontWeight="bold">&lt;</text>
        <text x="85" y="85" fill="white" fontSize="18" fontWeight="bold">/</text>
        <text x="105" y="85" fill="white" fontSize="18" fontWeight="bold">&gt;</text>
        
        <line x1="55" y1="95" x2="145" y2="95" stroke="white" strokeWidth="1" opacity="0.5" />
        
        <circle cx="60" cy="105" r="2.5" fill="white" opacity="0.6" />
        <circle cx="68" cy="105" r="2.5" fill="white" opacity="0.6" />
        <circle cx="76" cy="105" r="2.5" fill="white" opacity="0.6" />
        
        <circle cx="60" cy="115" r="2.5" fill="white" opacity="0.6" />
        <circle cx="68" cy="115" r="2.5" fill="white" opacity="0.6" />
        <circle cx="76" cy="115" r="2.5" fill="white" opacity="0.6" />
        
        {/* Laptop base */}
        <rect x="65" y="125" width="70" height="8" fill="#1a1a1a" />
        <line x1="55" y1="133" x2="145" y2="133" stroke="#1a1a1a" strokeWidth="3" strokeLinecap="round" />
      </svg>
    )
  };

  return (
    <div className="service-icon-container">
      {icons[serviceId] || icons[9]}
    </div>
  );
}

export default ServiceIcon;
