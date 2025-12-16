import React from 'react';
import './DiagramRenderer.css';

function DiagramRenderer({ diagramType }) {
  const diagrams = {
    'landing-zone': (
      <svg viewBox="0 0 600 400" className="service-diagram">
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#2563eb', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#1d4ed8', stopOpacity: 1 }} />
          </linearGradient>
        </defs>
        <rect width="600" height="400" fill="#f8f9fa" />
        
        {/* Organization Structure */}
        <rect x="50" y="30" width="500" height="60" rx="8" fill="url(#grad1)" stroke="#2563eb" strokeWidth="2" />
        <text x="300" y="65" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">Organization & Folder Hierarchy</text>
        
        {/* IAM & SSO */}
        <rect x="50" y="120" width="140" height="80" rx="8" fill="#e0e7ff" stroke="#2563eb" strokeWidth="2" />
        <text x="120" y="155" textAnchor="middle" fill="#2563eb" fontSize="13" fontWeight="bold">IAM &amp;</text>
        <text x="120" y="175" textAnchor="middle" fill="#2563eb" fontSize="13" fontWeight="bold">SSO Setup</text>
        
        {/* Network Architecture */}
        <rect x="230" y="120" width="140" height="80" rx="8" fill="#e0e7ff" stroke="#2563eb" strokeWidth="2" />
        <text x="300" y="150" textAnchor="middle" fill="#2563eb" fontSize="13" fontWeight="bold">Network</text>
        <text x="300" y="170" textAnchor="middle" fill="#2563eb" fontSize="13" fontWeight="bold">Architecture</text>
        
        {/* Security Baselines */}
        <rect x="410" y="120" width="140" height="80" rx="8" fill="#e0e7ff" stroke="#2563eb" strokeWidth="2" />
        <text x="480" y="150" textAnchor="middle" fill="#2563eb" fontSize="13" fontWeight="bold">Security</text>
        <text x="480" y="170" textAnchor="middle" fill="#2563eb" fontSize="13" fontWeight="bold">Baselines</text>
        
        {/* Logging & Monitoring */}
        <rect x="140" y="240" width="320" height="80" rx="8" fill="#fef08a" stroke="#ca8a04" strokeWidth="2" />
        <text x="300" y="275" textAnchor="middle" fill="#854d0e" fontSize="14" fontWeight="bold">Logging, Monitoring &amp; Billing Configuration</text>
        
        {/* Connection Lines */}
        <line x1="120" y1="200" x2="120" y2="240" stroke="#2563eb" strokeWidth="2" strokeDasharray="5,5" />
        <line x1="300" y1="200" x2="300" y2="240" stroke="#2563eb" strokeWidth="2" strokeDasharray="5,5" />
        <line x1="480" y1="200" x2="480" y2="240" stroke="#2563eb" strokeWidth="2" strokeDasharray="5,5" />
      </svg>
    ),

    'cloud-adoption': (
      <svg viewBox="0 0 600 400" className="service-diagram">
        <defs>
          <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#2563eb', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#1d4ed8', stopOpacity: 1 }} />
          </linearGradient>
        </defs>
        <rect width="600" height="400" fill="#f8f9fa" />
        
        <circle cx="150" cy="120" r="50" fill="url(#grad2)" />
        <text x="150" y="130" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Assessment</text>
        
        <circle cx="300" cy="120" r="50" fill="url(#grad2)" />
        <text x="300" y="125" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">Governance</text>
        <text x="300" y="140" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">&amp; Ops</text>
        
        <circle cx="450" cy="120" r="50" fill="url(#grad2)" />
        <text x="450" y="125" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">Optimization</text>
        <text x="450" y="140" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">&amp; ROI</text>
        
        <line x1="200" y1="120" x2="250" y2="120" stroke="#2563eb" strokeWidth="3" markerEnd="url(#arrowhead)" />
        <line x1="350" y1="120" x2="400" y2="120" stroke="#2563eb" strokeWidth="3" markerEnd="url(#arrowhead)" />
        
        <defs>
          <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
            <polygon points="0 0, 10 3, 0 6" fill="#2563eb" />
          </marker>
        </defs>
        
        <rect x="50" y="240" width="500" height="120" rx="8" fill="#e0e7ff" stroke="#2563eb" strokeWidth="2" />
        <text x="300" y="265" textAnchor="middle" fill="#2563eb" fontSize="14" fontWeight="bold">Key Outcomes</text>
        <line x1="100" y1="275" x2="500" y2="275" stroke="#2563eb" strokeWidth="1" opacity="0.3" />
        
        <text x="70" y="300" fill="#1a1a1a" fontSize="12">✓ Reduced infrastructure costs</text>
        <text x="70" y="325" fill="#1a1a1a" fontSize="12">✓ Improved agility and scalability</text>
        <text x="70" y="350" fill="#1a1a1a" fontSize="12">✓ Better security and compliance posture</text>
      </svg>
    ),

    'cloud-migration': (
      <svg viewBox="0 0 600 400" className="service-diagram">
        <rect width="600" height="400" fill="#f8f9fa" />
        
        <g>
          {/* On-Premises */}
          <rect x="30" y="80" width="200" height="200" rx="8" fill="#fee2e2" stroke="#dc2626" strokeWidth="2" />
          <text x="130" y="110" textAnchor="middle" fill="#991b1b" fontSize="14" fontWeight="bold">On-Premises</text>
          <circle cx="80" cy="160" r="20" fill="#dc2626" opacity="0.3" />
          <circle cx="130" cy="200" r="20" fill="#dc2626" opacity="0.3" />
          <circle cx="180" cy="150" r="20" fill="#dc2626" opacity="0.3" />
          
          {/* Arrow */}
          <line x1="240" y1="180" x2="330" y2="180" stroke="#2563eb" strokeWidth="4" markerEnd="url(#arrowhead2)" />
          <text x="285" y="170" textAnchor="middle" fill="#2563eb" fontSize="12" fontWeight="bold">Migration</text>
          
          {/* Cloud */}
          <rect x="370" y="80" width="200" height="200" rx="8" fill="#dcfce7" stroke="#16a34a" strokeWidth="2" />
          <text x="470" y="110" textAnchor="middle" fill="#15803d" fontSize="14" fontWeight="bold">Cloud (GCP)</text>
          <circle cx="420" cy="160" r="20" fill="#16a34a" opacity="0.3" />
          <circle cx="470" cy="200" r="20" fill="#16a34a" opacity="0.3" />
          <circle cx="520" cy="150" r="20" fill="#16a34a" opacity="0.3" />
        </g>
        
        <defs>
          <marker id="arrowhead2" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
            <polygon points="0 0, 10 3, 0 6" fill="#2563eb" />
          </marker>
        </defs>
        
        <rect x="50" y="310" width="500" height="70" rx="8" fill="#fef08a" stroke="#ca8a04" strokeWidth="2" />
        <text x="300" y="335" textAnchor="middle" fill="#854d0e" fontSize="13" fontWeight="bold">Benefits: Reduced downtime, improved performance, cost savings</text>
      </svg>
    ),

    'app-modernization': (
      <svg viewBox="0 0 600 400" className="service-diagram">
        <rect width="600" height="400" fill="#f8f9fa" />
        
        <g>
          {/* Before */}
          <rect x="30" y="30" width="220" height="140" rx="8" fill="#fee2e2" stroke="#dc2626" strokeWidth="2" />
          <text x="140" y="55" textAnchor="middle" fill="#991b1b" fontSize="13" fontWeight="bold">Legacy Monolith</text>
          <rect x="50" y="75" width="180" height="80" rx="4" fill="#fecaca" stroke="#dc2626" strokeWidth="1" />
          <text x="140" y="110" textAnchor="middle" fill="#7f1d1d" fontSize="12">Single large codebase</text>
          <text x="140" y="130" textAnchor="middle" fill="#7f1d1d" fontSize="12">Hard to scale &amp; maintain</text>
          
          {/* Arrow */}
          <line x1="270" y1="100" x2="320" y2="100" stroke="#2563eb" strokeWidth="4" markerEnd="url(#arrowhead3)" />
          
          {/* After */}
          <rect x="350" y="30" width="220" height="140" rx="8" fill="#dcfce7" stroke="#16a34a" strokeWidth="2" />
          <text x="460" y="55" textAnchor="middle" fill="#15803d" fontSize="13" fontWeight="bold">Modern Cloud-Native</text>
          <rect x="370" y="75" width="45" height="50" rx="4" fill="#bbf7d0" stroke="#16a34a" strokeWidth="1" />
          <rect x="430" y="75" width="45" height="50" rx="4" fill="#bbf7d0" stroke="#16a34a" strokeWidth="1" />
          <rect x="490" y="75" width="45" height="50" rx="4" fill="#bbf7d0" stroke="#16a34a" strokeWidth="1" />
          <text x="460" y="140" textAnchor="middle" fill="#15803d" fontSize="11">Microservices</text>
        </g>
        
        <defs>
          <marker id="arrowhead3" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
            <polygon points="0 0, 10 3, 0 6" fill="#2563eb" />
          </marker>
        </defs>
        
        <rect x="50" y="210" width="180" height="160" rx="8" fill="#e0e7ff" stroke="#2563eb" strokeWidth="2" />
        <text x="140" y="240" textAnchor="middle" fill="#2563eb" fontSize="12" fontWeight="bold">Technologies</text>
        <line x1="70" y1="250" x2="210" y2="250" stroke="#2563eb" strokeWidth="1" opacity="0.3" />
        <text x="70" y="275" fill="#1a1a1a" fontSize="11">• Docker Containerization</text>
        <text x="70" y="295" fill="#1a1a1a" fontSize="11">• Kubernetes Orchestration</text>
        <text x="70" y="315" fill="#1a1a1a" fontSize="11">• API-First Architecture</text>
        <text x="70" y="335" fill="#1a1a1a" fontSize="11">• CI/CD Pipelines</text>
        
        <rect x="270" y="210" width="280" height="160" rx="8" fill="#fef08a" stroke="#ca8a04" strokeWidth="2" />
        <text x="410" y="240" textAnchor="middle" fill="#854d0e" fontSize="12" fontWeight="bold">Key Benefits</text>
        <line x1="290" y1="250" x2="530" y2="250" stroke="#ca8a04" strokeWidth="1" opacity="0.3" />
        <text x="290" y="275" fill="#1a1a1a" fontSize="11">✓ Independent scaling</text>
        <text x="290" y="295" fill="#1a1a1a" fontSize="11">✓ Faster deployment cycles</text>
        <text x="290" y="315" fill="#1a1a1a" fontSize="11">✓ Improved fault isolation</text>
        <text x="290" y="335" fill="#1a1a1a" fontSize="11">✓ Better resource utilization</text>
      </svg>
    ),

    'infra-modernization': (
      <svg viewBox="0 0 600 400" className="service-diagram">
        <rect width="600" height="400" fill="#f8f9fa" />
        
        <g>
          <rect x="30" y="30" width="540" height="100" rx="8" fill="#2563eb" opacity="0.1" stroke="#2563eb" strokeWidth="2" />
          <text x="300" y="50" textAnchor="middle" fill="#2563eb" fontSize="14" fontWeight="bold">Cloud-Native Infrastructure Layer</text>
          
          <rect x="50" y="60" width="100" height="50" rx="6" fill="#2563eb" opacity="0.3" stroke="#2563eb" strokeWidth="1" />
          <text x="100" y="90" textAnchor="middle" fill="#2563eb" fontSize="11" fontWeight="bold">Compute</text>
          
          <rect x="170" y="60" width="100" height="50" rx="6" fill="#2563eb" opacity="0.3" stroke="#2563eb" strokeWidth="1" />
          <text x="220" y="90" textAnchor="middle" fill="#2563eb" fontSize="11" fontWeight="bold">Storage</text>
          
          <rect x="290" y="60" width="100" height="50" rx="6" fill="#2563eb" opacity="0.3" stroke="#2563eb" strokeWidth="1" />
          <text x="340" y="90" textAnchor="middle" fill="#2563eb" fontSize="11" fontWeight="bold">Networking</text>
          
          <rect x="410" y="60" width="120" height="50" rx="6" fill="#2563eb" opacity="0.3" stroke="#2563eb" strokeWidth="1" />
          <text x="470" y="90" textAnchor="middle" fill="#2563eb" fontSize="11" fontWeight="bold">Security</text>
        </g>
        
        <g>
          <rect x="30" y="165" width="540" height="100" rx="8" fill="#16a34a" opacity="0.1" stroke="#16a34a" strokeWidth="2" />
          <text x="300" y="185" textAnchor="middle" fill="#15803d" fontSize="14" fontWeight="bold">Modern Services</text>
          
          <circle cx="120" cy="225" r="30" fill="#16a34a" opacity="0.3" stroke="#16a34a" strokeWidth="1" />
          <text x="120" y="230" textAnchor="middle" fill="#15803d" fontSize="10" fontWeight="bold">Serverless</text>
          
          <circle cx="240" cy="225" r="30" fill="#16a34a" opacity="0.3" stroke="#16a34a" strokeWidth="1" />
          <text x="240" y="230" textAnchor="middle" fill="#15803d" fontSize="10" fontWeight="bold">Databases</text>
          
          <circle cx="360" cy="225" r="30" fill="#16a34a" opacity="0.3" stroke="#16a34a" strokeWidth="1" />
          <text x="360" y="230" textAnchor="middle" fill="#15803d" fontSize="10" fontWeight="bold">CI/CD</text>
          
          <circle cx="480" cy="225" r="30" fill="#16a34a" opacity="0.3" stroke="#16a34a" strokeWidth="1" />
          <text x="480" y="230" textAnchor="middle" fill="#15803d" fontSize="10" fontWeight="bold">Monitoring</text>
        </g>
        
        <rect x="50" y="300" width="500" height="70" rx="8" fill="#fef08a" stroke="#ca8a04" strokeWidth="2" />
        <text x="300" y="330" textAnchor="middle" fill="#854d0e" fontSize="13" fontWeight="bold">Outcome: Scalability, Resilience, Cost Efficiency &amp; Automation</text>
      </svg>
    ),

    'iaas-refactoring': (
      <svg viewBox="0 0 600 400" className="service-diagram">
        <rect width="600" height="400" fill="#f8f9fa" />
        
        <rect x="50" y="40" width="500" height="80" rx="8" fill="#e0e7ff" stroke="#2563eb" strokeWidth="2" />
        <text x="300" y="60" textAnchor="middle" fill="#2563eb" fontSize="14" fontWeight="bold">IaaS-Optimized Architecture</text>
        <text x="300" y="85" textAnchor="middle" fill="#1a1a1a" fontSize="12">(Virtual Machines, Storage &amp; Networking)</text>
        
        <g>
          {/* VMs */}
          <rect x="50" y="160" width="140" height="140" rx="8" fill="#fef08a" stroke="#ca8a04" strokeWidth="2" />
          <text x="120" y="185" textAnchor="middle" fill="#854d0e" fontSize="12" fontWeight="bold">VM Optimization</text>
          <circle cx="100" cy="240" r="15" fill="#ca8a04" opacity="0.5" />
          <circle cx="140" cy="240" r="15" fill="#ca8a04" opacity="0.5" />
          <text x="120" y="275" textAnchor="middle" fill="#854d0e" fontSize="10">Right-sizing &amp; Cost</text>
          
          {/* Storage */}
          <rect x="230" y="160" width="140" height="140" rx="8" fill="#dcfce7" stroke="#16a34a" strokeWidth="2" />
          <text x="300" y="185" textAnchor="middle" fill="#15803d" fontSize="12" fontWeight="bold">Storage Optimization</text>
          <rect x="265" y="215" width="20" height="30" fill="#16a34a" opacity="0.5" />
          <rect x="295" y="210" width="20" height="35" fill="#16a34a" opacity="0.5" />
          <rect x="325" y="220" width="20" height="25" fill="#16a34a" opacity="0.5" />
          <text x="300" y="275" textAnchor="middle" fill="#15803d" fontSize="10">Efficiency &amp; Redundancy</text>
          
          {/* Network */}
          <rect x="410" y="160" width="140" height="140" rx="8" fill="#bfdbfe" stroke="#2563eb" strokeWidth="2" />
          <text x="480" y="185" textAnchor="middle" fill="#1e40af" fontSize="12" fontWeight="bold">Network Segmentation</text>
          <circle cx="460" cy="230" r="8" fill="#2563eb" opacity="0.6" />
          <circle cx="480" cy="235" r="8" fill="#2563eb" opacity="0.6" />
          <circle cx="500" cy="230" r="8" fill="#2563eb" opacity="0.6" />
          <line x1="460" y1="230" x2="480" y2="235" stroke="#2563eb" strokeWidth="1" />
          <line x1="480" y1="235" x2="500" y2="230" stroke="#2563eb" strokeWidth="1" />
          <text x="480" y="275" textAnchor="middle" fill="#1e40af" fontSize="10">Security &amp; Isolation</text>
        </g>
      </svg>
    ),

    'frontend-development': (
      <svg viewBox="0 0 600 400" className="service-diagram">
        <rect width="600" height="400" fill="#f8f9fa" />
        
        <g>
          {/* Frontend */}
          <rect x="50" y="50" width="200" height="120" rx="8" fill="#bfdbfe" stroke="#2563eb" strokeWidth="2" />
          <text x="150" y="75" textAnchor="middle" fill="#1e40af" fontSize="13" fontWeight="bold">Frontend Layer</text>
          <text x="150" y="100" textAnchor="middle" fill="#1a1a1a" fontSize="11">React / Next.js</text>
          <text x="150" y="120" textAnchor="middle" fill="#1a1a1a" fontSize="11">Responsive UI</text>
          <text x="150" y="140" textAnchor="middle" fill="#1a1a1a" fontSize="11">Mobile-first</text>
          
          {/* API Gateway */}
          <line x1="260" y1="110" x2="310" y2="110" stroke="#2563eb" strokeWidth="3" markerEnd="url(#arrowhead4)" />
          <text x="285" y="100" textAnchor="middle" fill="#2563eb" fontSize="11" fontWeight="bold">APIs</text>
          
          {/* Backend */}
          <rect x="350" y="50" width="200" height="120" rx="8" fill="#dcfce7" stroke="#16a34a" strokeWidth="2" />
          <text x="450" y="75" textAnchor="middle" fill="#15803d" fontSize="13" fontWeight="bold">Cloud Backend</text>
          <text x="450" y="100" textAnchor="middle" fill="#1a1a1a" fontSize="11">Microservices</text>
          <text x="450" y="120" textAnchor="middle" fill="#1a1a1a" fontSize="11">Databases</text>
          <text x="450" y="140" textAnchor="middle" fill="#1a1a1a" fontSize="11">Cloud Services</text>
        </g>
        
        <defs>
          <marker id="arrowhead4" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
            <polygon points="0 0, 10 3, 0 6" fill="#2563eb" />
          </marker>
        </defs>
        
        <rect x="50" y="210" width="500" height="160" rx="8" fill="#f3f4f6" stroke="#9ca3af" strokeWidth="2" />
        <text x="300" y="235" textAnchor="middle" fill="#374151" fontSize="13" fontWeight="bold">Key Features</text>
        
        <text x="70" y="260" fill="#1a1a1a" fontSize="11">✓ Performance Optimization (Caching, Code Splitting)</text>
        <text x="70" y="280" fill="#1a1a1a" fontSize="11">✓ Responsive Design (Desktop, Tablet, Mobile)</text>
        <text x="70" y="300" fill="#1a1a1a" fontSize="11">✓ State Management (Redux, Context API)</text>
        <text x="70" y="320" fill="#1a1a1a" fontSize="11">✓ SEO Optimization &amp; Accessibility</text>
        <text x="70" y="340" fill="#1a1a1a" fontSize="11">✓ Real-time Data Synchronization</text>
      </svg>
    ),

    'backend-development': (
      <svg viewBox="0 0 600 400" className="service-diagram">
        <rect width="600" height="400" fill="#f8f9fa" />
        
        <rect x="50" y="20" width="500" height="70" rx="8" fill="#2563eb" opacity="0.1" stroke="#2563eb" strokeWidth="2" />
        <text x="300" y="50" textAnchor="middle" fill="#2563eb" fontSize="14" fontWeight="bold">Cloud Backend Architecture</text>
        
        <g>
          {/* APIs */}
          <rect x="50" y="120" width="130" height="120" rx="8" fill="#bfdbfe" stroke="#2563eb" strokeWidth="2" />
          <text x="115" y="145" textAnchor="middle" fill="#1e40af" fontSize="12" fontWeight="bold">API Services</text>
          <text x="115" y="165" textAnchor="middle" fill="#1a1a1a" fontSize="10">REST/GraphQL</text>
          <text x="115" y="185" textAnchor="middle" fill="#1a1a1a" fontSize="10">Authentication</text>
          <text x="115" y="205" textAnchor="middle" fill="#1a1a1a" fontSize="10">Validation</text>
          
          {/* Serverless */}
          <rect x="210" y="120" width="130" height="120" rx="8" fill="#dcfce7" stroke="#16a34a" strokeWidth="2" />
          <text x="275" y="145" textAnchor="middle" fill="#15803d" fontSize="12" fontWeight="bold">Serverless</text>
          <text x="275" y="165" textAnchor="middle" fill="#1a1a1a" fontSize="10">Cloud Functions</text>
          <text x="275" y="185" textAnchor="middle" fill="#1a1a1a" fontSize="10">Event Handlers</text>
          <text x="275" y="205" textAnchor="middle" fill="#1a1a1a" fontSize="10">Async Processing</text>
          
          {/* Databases */}
          <rect x="370" y="120" width="130" height="120" rx="8" fill="#fef08a" stroke="#ca8a04" strokeWidth="2" />
          <text x="435" y="145" textAnchor="middle" fill="#854d0e" fontSize="12" fontWeight="bold">Databases</text>
          <text x="435" y="165" textAnchor="middle" fill="#1a1a1a" fontSize="10">SQL/NoSQL</text>
          <text x="435" y="185" textAnchor="middle" fill="#1a1a1a" fontSize="10">Caching</text>
          <text x="435" y="205" textAnchor="middle" fill="#1a1a1a" fontSize="10">Replication</text>
        </g>
        
        <rect x="50" y="275" width="500" height="105" rx="8" fill="#f3f4f6" stroke="#9ca3af" strokeWidth="2" />
        <text x="300" y="300" textAnchor="middle" fill="#374151" fontSize="12" fontWeight="bold">Monitoring &amp; Operations</text>
        <line x1="100" y1="310" x2="500" y2="310" stroke="#9ca3af" strokeWidth="1" opacity="0.3" />
        
        <text x="70" y="330" fill="#1a1a1a" fontSize="11">✓ Logging &amp; Tracing    ✓ Performance Monitoring    ✓ Auto-scaling</text>
        <text x="70" y="350" fill="#1a1a1a" fontSize="11">✓ Health Checks    ✓ Alerting &amp; Notifications    ✓ Security</text>
      </svg>
    ),

    'six-r-framework': (
      <svg viewBox="0 0 700 200" className="service-diagram">
        <defs>
          <linearGradient id="r1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#2563eb', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#1d4ed8', stopOpacity: 1 }} />
          </linearGradient>
          <linearGradient id="r2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#16a34a', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#15803d', stopOpacity: 1 }} />
          </linearGradient>
          <linearGradient id="r3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#ca8a04', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#92400e', stopOpacity: 1 }} />
          </linearGradient>
          <linearGradient id="r4" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#dc2626', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#991b1b', stopOpacity: 1 }} />
          </linearGradient>
          <linearGradient id="r5" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#9333ea', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#6b21a8', stopOpacity: 1 }} />
          </linearGradient>
          <linearGradient id="r6" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#0891b2', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#0e7490', stopOpacity: 1 }} />
          </linearGradient>
        </defs>

        <rect width="700" height="200" fill="#f8f9fa" />

        {/* Rehost */}
        <rect x="10" y="30" width="100" height="70" rx="6" fill="url(#r1)" stroke="#2563eb" strokeWidth="2" />
        <text x="60" y="50" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Rehost</text>
        <text x="60" y="80" textAnchor="middle" fill="white" fontSize="10">(Lift-Shift)</text>

        {/* Replatform */}
        <rect x="120" y="30" width="100" height="70" rx="6" fill="url(#r2)" stroke="#16a34a" strokeWidth="2" />
        <text x="170" y="50" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Replatform</text>
        <text x="170" y="80" textAnchor="middle" fill="white" fontSize="10">(Lift-Opt)</text>

        {/* Refactor - highlighted as most impactful */}
        <rect x="230" y="20" width="100" height="90" rx="6" fill="url(#r3)" stroke="#ca8a04" strokeWidth="3" />
        <text x="280" y="50" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">Refactor</text>
        <text x="280" y="75" textAnchor="middle" fill="white" fontSize="9">(Re-architect)</text>
        <text x="280" y="100" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">★ HIGHEST VALUE</text>

        {/* Repurchase */}
        <rect x="340" y="30" width="100" height="70" rx="6" fill="url(#r4)" stroke="#dc2626" strokeWidth="2" />
        <text x="390" y="50" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Repurchase</text>
        <text x="390" y="80" textAnchor="middle" fill="white" fontSize="10">(SaaS Adopt)</text>

        {/* Retire */}
        <rect x="450" y="30" width="100" height="70" rx="6" fill="url(#r5)" stroke="#9333ea" strokeWidth="2" />
        <text x="500" y="50" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Retire</text>
        <text x="500" y="80" textAnchor="middle" fill="white" fontSize="10">(Decommission)</text>

        {/* Retain */}
        <rect x="560" y="30" width="100" height="70" rx="6" fill="url(#r6)" stroke="#0891b2" strokeWidth="2" />
        <text x="610" y="50" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Retain</text>
        <text x="610" y="80" textAnchor="middle" fill="white" fontSize="10">(Keep As-Is)</text>

        {/* Legend */}
        <text x="10" y="130" fill="#333" fontSize="11" fontWeight="bold">Strategy Guide:</text>
        <line x1="10" y1="135" x2="690" y2="135" stroke="#d1d5db" strokeWidth="1" />

        <text x="10" y="155" fill="#555" fontSize="10">Rehost: Fastest • Replatform: Quick Wins • Refactor: Maximum Value • Repurchase: Reduce Ops</text>
        <text x="10" y="175" fill="#555" fontSize="10">Retire: Cost Savings • Retain: Future Ready • Often use hybrid approach combining multiple strategies</text>
      </svg>
    ),

    'software-development': (
      <svg viewBox="0 0 600 400" className="service-diagram">
        <rect width="600" height="400" fill="#f8f9fa" />
        
        <g>
          <circle cx="100" cy="100" r="45" fill="#bfdbfe" stroke="#2563eb" strokeWidth="2" />
          <text x="100" y="95" textAnchor="middle" fill="#1e40af" fontSize="12" fontWeight="bold">1</text>
          <text x="100" y="125" textAnchor="middle" fill="#1e40af" fontSize="11" fontWeight="bold">Discovery</text>
          
          <line x1="150" y1="100" x2="200" y2="100" stroke="#2563eb" strokeWidth="2" />
          
          <circle cx="250" cy="100" r="45" fill="#bfdbfe" stroke="#2563eb" strokeWidth="2" />
          <text x="250" y="95" textAnchor="middle" fill="#1e40af" fontSize="12" fontWeight="bold">2</text>
          <text x="250" y="125" textAnchor="middle" fill="#1e40af" fontSize="11" fontWeight="bold">Design</text>
          
          <line x1="300" y1="100" x2="350" y2="100" stroke="#2563eb" strokeWidth="2" />
          
          <circle cx="400" cy="100" r="45" fill="#dcfce7" stroke="#16a34a" strokeWidth="2" />
          <text x="400" y="95" textAnchor="middle" fill="#15803d" fontSize="12" fontWeight="bold">3</text>
          <text x="400" y="125" textAnchor="middle" fill="#15803d" fontSize="11" fontWeight="bold">Development</text>
          
          <line x1="450" y1="100" x2="500" y2="100" stroke="#2563eb" strokeWidth="2" />
          
          <circle cx="550" cy="100" r="45" fill="#fef08a" stroke="#ca8a04" strokeWidth="2" />
          <text x="550" y="95" textAnchor="middle" fill="#854d0e" fontSize="12" fontWeight="bold">4</text>
          <text x="550" y="125" textAnchor="middle" fill="#854d0e" fontSize="11" fontWeight="bold">Deploy</text>
        </g>
        
        <rect x="50" y="200" width="500" height="170" rx="8" fill="#f3f4f6" stroke="#9ca3af" strokeWidth="2" />
        <text x="300" y="230" textAnchor="middle" fill="#374151" fontSize="13" fontWeight="bold">SDLC (Software Development Lifecycle)</text>
        <line x1="100" y1="240" x2="500" y2="240" stroke="#9ca3af" strokeWidth="1" opacity="0.3" />
        
        <text x="70" y="265" fill="#1a1a1a" fontSize="11">✓ Requirements Analysis &amp; Planning</text>
        <text x="70" y="285" fill="#1a1a1a" fontSize="11">✓ Architecture &amp; Design Patterns</text>
        <text x="70" y="305" fill="#1a1a1a" fontSize="11">✓ Agile Development &amp; Testing</text>
        <text x="70" y="325" fill="#1a1a1a" fontSize="11">✓ Continuous Integration &amp; Deployment</text>
        <text x="70" y="345" fill="#1a1a1a" fontSize="11">✓ Maintenance &amp; Support</text>
      </svg>
    )
  };

  return (
    <div className="diagram-wrapper">
      {diagrams[diagramType] || diagrams['software-development']}
    </div>
  );
}

export default DiagramRenderer;
