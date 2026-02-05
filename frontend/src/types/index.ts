export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  creditsBalance: number;
  plan?: "FREE" | "PRO" | "BUSINESS";
}

export interface PhotoTemplate {
  id: string;
  slug?: string;
  name: string;
  description: string;
  category: string;
  aspectRatio: string;
  platformSuggestions: string[];
  internalPrompt?: string;
  exampleImageUrl?: string;
}

export interface GeneratedImage {
  id: string;
  imageUrl: string;
  width: number;
  height: number;
  metadata?: Record<string, unknown>;
}

export interface GenerationJob {
  id: string;
  templateId: string;
  originalImageUrl: string;
  businessType: string;
  platformTarget: string;
  quantityRequested: number;
  status: "PENDING" | "PROCESSING" | "COMPLETED" | "FAILED";
  creditsUsed: number;
  generatedImages: GeneratedImage[];
  createdAt: string;
}
