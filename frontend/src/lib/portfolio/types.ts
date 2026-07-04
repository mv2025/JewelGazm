export interface ClientReview {
  author: string;
  role: string;
  quote: string;
  avatar?: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  handle: string;
  client: string;
  category: string; // e.g., 'Product', 'Fashion', 'Commercial', 'Lifestyle', 'Rental', 'Food', 'Cosmetics', 'Luxury Products'
  year: string;
  featured: boolean;
  heroImage: string;
  moodboardImages: string[];
  galleryImages: string[];
  tags: string[];
  
  // Immersive Details
  challenge: string;
  process: string;
  equipmentUsed: string[];
  lightingSetup: string;
  deliverables: string[];
  results: string;
  
  clientReview: ClientReview;
}

export interface PortfolioCategory {
  name: string;
  handle: string;
  description: string;
  image: string;
}
