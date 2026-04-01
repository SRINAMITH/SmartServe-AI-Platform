import { Service } from '../types';

export const services: Service[] = [
  {
    id: '1',
    name: 'Cybersecurity Audit',
    description: 'Comprehensive security assessment for your digital infrastructure.',
    category: 'cybersecurity',
    icon: 'ShieldCheck',
  },
  {
    id: '2',
    name: 'Cloud Migration',
    description: 'Seamlessly move your data and applications to the cloud.',
    category: 'cloud',
    icon: 'Cloud',
  },
  {
    id: '3',
    name: 'Custom Web Development',
    description: 'Build high-performance web applications tailored to your needs.',
    category: 'development',
    icon: 'Code',
  },
  {
    id: '4',
    name: 'AI-Powered Marketing',
    description: 'Optimize your marketing strategy with data-driven AI insights.',
    category: 'marketing',
    icon: 'TrendingUp',
  },
  {
    id: '5',
    name: 'IT Strategic Consulting',
    description: 'Expert advice to align your technology with business goals.',
    category: 'consulting',
    icon: 'Briefcase',
  },
  {
    id: '6',
    name: 'Penetration Testing',
    description: 'Simulated cyber attacks to identify vulnerabilities.',
    category: 'cybersecurity',
    icon: 'Lock',
  },
  {
    id: '7',
    name: 'Mobile App Development',
    description: 'Create engaging mobile experiences for iOS and Android.',
    category: 'development',
    icon: 'Smartphone',
  },
  {
    id: '8',
    name: 'SEO Optimization',
    description: 'Improve your search engine rankings and visibility.',
    category: 'marketing',
    icon: 'Search',
  },
];

export const getRecommendations = (query: string): Service[] => {
  const lowerQuery = query.toLowerCase();
  return services.filter(service => 
    service.name.toLowerCase().includes(lowerQuery) ||
    service.description.toLowerCase().includes(lowerQuery) ||
    service.category.toLowerCase().includes(lowerQuery)
  );
};
