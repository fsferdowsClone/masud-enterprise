export interface SiteContent {
  heroTitle: string;
  heroSubtitle: string;
  aboutText: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
}

export interface StageType {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  features: string[];
}

export interface GalleryItem {
  id: string;
  title: string;
  imageUrl: string;
  category: 'Concert' | 'Corporate' | 'Exhibition' | 'Wedding';
  createdAt: any;
}

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
  publishedAt: any;
  author: string;
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  createdAt: any;
}
