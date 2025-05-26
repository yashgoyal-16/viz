export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface IoTProject {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  components: string[];
  steps: ProjectStep[];
  imageUrl: string;
}

export interface ProjectStep {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  codeSnippet?: string;
}

export interface IoTIdea {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  imageUrl: string;
}