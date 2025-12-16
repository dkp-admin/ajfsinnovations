export const serviceDetails = [
  {
    id: 1,
    title: 'Landing Zone Development',
    overview: 'Secure, scalable, compliant foundational setup for GCP. We establish core accounts, networking, security controls, and identity management to ensure a robust starting point for your cloud journey.',
    benefits: [
      'Organization structure and folder hierarchy optimization',
      'IAM and SSO setup for secure access control',
      'Network architecture with VPC, subnets, and firewalls',
      'Security baselines and guardrails implementation',
      'Logging, monitoring, and billing configuration'
    ],
    phases: [
      {
        phase: 'Phase 1: Assessment',
        description: 'Evaluate current requirements and compliance needs'
      },
      {
        phase: 'Phase 2: Design',
        description: 'Design secure architecture and governance model'
      },
      {
        phase: 'Phase 3: Implementation',
        description: 'Deploy infrastructure and security controls'
      },
      {
        phase: 'Phase 4: Validation',
        description: 'Test and optimize for production readiness'
      }
    ],
    useCases: [
      'Enterprise cloud infrastructure setup',
      'Multi-team organization structure',
      'Regulatory compliance requirements',
      'Global distributed operations'
    ],
    timeline: '8-12 weeks',
    diagram: 'landing-zone'
  },
  {
    id: 2,
    title: 'Cloud Adoption',
    overview: 'Strategic guidance for adopting cloud services with best practices. We ensure smooth transition and maximize cloud computing benefits across your organization.',
    benefits: [
      'Assessment and readiness evaluation',
      'Governance and security frameworks',
      'Operating model design for cloud operations',
      'Cloud cost optimization strategies',
      'Migration roadmap and phased approach'
    ],
    phases: [
      {
        phase: 'Phase 1: Assessment',
        description: 'Evaluate cloud readiness and business goals'
      },
      {
        phase: 'Phase 2: Strategy',
        description: 'Develop governance and operating models'
      },
      {
        phase: 'Phase 3: Enablement',
        description: 'Train teams and establish best practices'
      },
      {
        phase: 'Phase 4: Optimization',
        description: 'Monitor performance and optimize costs'
      }
    ],
    useCases: [
      'Digital transformation initiatives',
      'Cost reduction and optimization',
      'Scalability for growing businesses',
      'Enhanced collaboration and agility'
    ],
    timeline: '12-16 weeks',
    diagram: 'cloud-adoption'
  },
  {
    id: 3,
    title: 'Cloud Migration',
    overview: 'Efficiently move applications and data to the cloud with minimal downtime. We handle discovery, planning, execution, and optimization for a smooth transition.',
    benefits: [
      'Discovery and comprehensive analysis of current systems',
      'Detailed migration planning with risk mitigation',
      'Execution strategy for VMs, applications, and databases',
      'Cutover management with minimal downtime',
      'Post-migration optimization and validation'
    ],
    phases: [
      {
        phase: 'Phase 1: Discovery',
        description: 'Analyze applications and dependencies'
      },
      {
        phase: 'Phase 2: Planning',
        description: 'Create migration strategy and timelines'
      },
      {
        phase: 'Phase 3: Execution',
        description: 'Migrate applications with validation'
      },
      {
        phase: 'Phase 4: Optimization',
        description: 'Optimize performance and costs'
      }
    ],
    useCases: [
      'Legacy system migration',
      'Data center consolidation',
      'Platform or cloud provider migration',
      'Business continuity improvements'
    ],
    timeline: '16-24 weeks',
    diagram: 'cloud-migration'
  },
  {
    id: 4,
    title: 'Application Modernization',
    overview: 'Transform legacy applications into modern, cloud-native solutions. Improve performance, scalability, and maintainability through re-platforming and containerization.',
    benefits: [
      'Replatforming, refactoring, and rehosting strategies',
      'Containerization with Docker and Google Kubernetes Engine',
      'API-first architecture and microservices design',
      'Enhanced scalability and performance tuning',
      'Improved developer productivity and agility'
    ],
    phases: [
      {
        phase: 'Phase 1: Assessment',
        description: 'Evaluate applications and modernization path'
      },
      {
        phase: 'Phase 2: Design',
        description: 'Plan architecture and containerization approach'
      },
      {
        phase: 'Phase 3: Development',
        description: 'Refactor and containerize applications'
      },
      {
        phase: 'Phase 4: Deployment',
        description: 'Deploy and monitor modern applications'
      }
    ],
    useCases: [
      'Monolith to microservices transformation',
      'Legacy application revitalization',
      'Performance bottleneck resolution',
      'Increased deployment frequency'
    ],
    timeline: '20-28 weeks',
    diagram: 'app-modernization'
  },
  {
    id: 5,
    title: 'Infrastructure Modernization',
    overview: 'Upgrade compute, storage, and networking with cloud-native patterns. Move from traditional setups to agile, scalable cloud-based IaaS and PaaS solutions.',
    benefits: [
      'Serverless adoption for reduced operational overhead',
      'Managed database services for simplified operations',
      'Improved resiliency and disaster recovery capabilities',
      'CI/CD automation for faster deployments',
      'Significant cost-efficiency improvements'
    ],
    phases: [
      {
        phase: 'Phase 1: Assessment',
        description: 'Evaluate current infrastructure and gaps'
      },
      {
        phase: 'Phase 2: Design',
        description: 'Design modern cloud architecture'
      },
      {
        phase: 'Phase 3: Migration',
        description: 'Deploy new infrastructure components'
      },
      {
        phase: 'Phase 4: Optimization',
        description: 'Fine-tune performance and costs'
      }
    ],
    useCases: [
      'On-premises to cloud infrastructure',
      'Data center modernization',
      'Disaster recovery improvements',
      'Scalability for peak demand handling'
    ],
    timeline: '12-20 weeks',
    diagram: 'infra-modernization'
  },
  {
    id: 6,
    title: 'Refactoring using IaaS Approach',
    overview: 'Re-architect workloads to leverage cloud infrastructure effectively. IaaS refactoring optimizes your applications and infrastructure for flexibility, resource utilization, scalability, and cost efficiency. This approach redesigns applications to maximize cloud-native capabilities while improving performance and resilience.',
    sixRFramework: {
      title: 'Cloud Migration 6R Strategy',
      description: 'The 6R framework guides your migration strategy decisions. IaaS Refactoring is one of the most impactful paths:',
      strategies: [
        {
          name: 'Rehost',
          subtitle: 'Lift-and-Shift',
          description: 'Move workloads to cloud VMs without major changes. Fastest migration path with minimal refactoring.'
        },
        {
          name: 'Replatform',
          subtitle: 'Lift-and-Optimize',
          description: 'Make light optimizations while migrating (e.g., switch to managed databases for reduced ops overhead).'
        },
        {
          name: 'Refactor',
          subtitle: 'Re-architect',
          description: 'Redesign architecture for cloud-native scalability, performance, and cost benefits. Highest complexity but greatest value.'
        },
        {
          name: 'Repurchase',
          subtitle: 'SaaS Adoption',
          description: 'Replace existing applications with SaaS products. Reduces maintenance and infrastructure costs.'
        },
        {
          name: 'Retire',
          subtitle: 'Decommission',
          description: 'Remove unused, redundant, or obsolete applications. Reduces licensing and infrastructure costs.'
        },
        {
          name: 'Retain',
          subtitle: 'Keep As-Is',
          description: 'Keep workloads unchanged when migration is not yet feasible. Revisit later as business needs evolve.'
        }
      ],
      diagram: 'six-r-framework'
    },
    benefits: [
      'VM optimization and right-sizing for improved cost efficiency',
      'Storage restructuring for enhanced performance and redundancy',
      'Network segmentation with improved security and isolation',
      'Enhanced flexibility and resource control for scalability',
      'Cost optimization through improved utilization and reduced waste',
      'Increased resilience and disaster recovery capabilities'
    ],
    phases: [
      {
        phase: 'Phase 1: Assessment & Strategy',
        description: 'Analyze workloads, dependencies, and determine 6R approach fit'
      },
      {
        phase: 'Phase 2: Design & Architecture',
        description: 'Design IaaS-optimized architecture with cloud-native patterns'
      },
      {
        phase: 'Phase 3: Refactoring & Development',
        description: 're-architect applications, optimize VMs, storage, and networking'
      },
      {
        phase: 'Phase 4: Deployment & Validation',
        description: 'Deploy refactored systems with comprehensive testing and monitoring'
      }
    ],
    useCases: [
      'Legacy monolithic application modernization to cloud-native',
      'Cost reduction through VM right-sizing and storage optimization',
      'Performance improvement with cloud-native architecture patterns',
      'Hybrid migration using multiple 6R strategies'
    ],
    fitsInModel: 'Refactoring is one of the most complex but highest-value modernization paths in the 6R model. While Rehost provides quick wins, Refactoring delivers maximum cloud benefits through fundamental redesign. Many organizations use a hybrid approach, combining Rehost for some workloads, Replatform for others, and Refactoring for critical, high-value applications.',
    timeline: '10-16 weeks',
    diagram: 'iaas-refactoring'
  },
  {
    id: 7,
    title: 'Cloud Frontend Development',
    overview: 'Build responsive, scalable cloud-backed frontend applications. Create dynamic user interfaces that seamlessly integrate with cloud services.',
    benefits: [
      'Modern JavaScript frameworks (React, Next.js, Angular)',
      'API-first architecture for seamless backend integration',
      'Performance optimization and fast loading times',
      'Mobile-first responsive design approach',
      'Seamless cloud service integration and scalability'
    ],
    phases: [
      {
        phase: 'Phase 1: Design',
        description: 'Create UI/UX design and specifications'
      },
      {
        phase: 'Phase 2: Development',
        description: 'Build frontend with modern frameworks'
      },
      {
        phase: 'Phase 3: Integration',
        description: 'Connect with cloud backend services'
      },
      {
        phase: 'Phase 4: Optimization',
        description: 'Performance tuning and deployment'
      }
    ],
    useCases: [
      'Progressive web applications',
      'Real-time data dashboards',
      'E-commerce platforms',
      'Mobile and web applications'
    ],
    timeline: '8-14 weeks',
    diagram: 'frontend-development'
  },
  {
    id: 8,
    title: 'Cloud Backend Development',
    overview: 'Design and build robust, scalable backend systems on cloud platforms. Expertise in APIs, databases, serverless functions, and microservices.',
    benefits: [
      'RESTful and GraphQL API development',
      'Serverless functions for event-driven architecture',
      'Managed database services (SQL and NoSQL)',
      'Microservices architecture and scalability',
      'Comprehensive observability and logging'
    ],
    phases: [
      {
        phase: 'Phase 1: Design',
        description: 'Design API and system architecture'
      },
      {
        phase: 'Phase 2: Development',
        description: 'Build backend services and APIs'
      },
      {
        phase: 'Phase 3: Testing',
        description: 'Comprehensive testing and validation'
      },
      {
        phase: 'Phase 4: Deployment',
        description: 'Deploy to production with monitoring'
      }
    ],
    useCases: [
      'Microservices-based systems',
      'High-traffic API platforms',
      'Real-time data processing',
      'Multi-tenant SaaS applications'
    ],
    timeline: '10-18 weeks',
    diagram: 'backend-development'
  },
  {
    id: 9,
    title: 'Software Development',
    overview: 'Comprehensive custom software development from conceptualization to deployment. Build high-quality, innovative solutions tailored to your business needs.',
    benefits: [
      'End-to-end application delivery',
      'Scalable system design and architecture',
      'Comprehensive maintenance and support',
      'Multi-platform deployment options',
      'Agile development methodology'
    ],
    phases: [
      {
        phase: 'Phase 1: Discovery',
        description: 'Understand requirements and goals'
      },
      {
        phase: 'Phase 2: Design',
        description: 'Create architecture and design specs'
      },
      {
        phase: 'Phase 3: Development',
        description: 'Build and test application'
      },
      {
        phase: 'Phase 4: Deployment',
        description: 'Deploy and provide ongoing support'
      }
    ],
    useCases: [
      'Enterprise applications',
      'SaaS platforms',
      'Mobile applications',
      'Custom business solutions'
    ],
    timeline: '14-26 weeks',
    diagram: 'software-development'
  }
];
