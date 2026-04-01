export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: number;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  category: 'cybersecurity' | 'cloud' | 'development' | 'marketing' | 'consulting';
  icon: string;
}

export interface QueryHistory {
  id: string;
  query: string;
  recommendation: string;
  timestamp: number;
}
