
export interface User {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

export interface Journey {
  id: string;
  userId: string;
  route: string;
  date: string;
  fare: number;
  paymentId: string;
}

export interface Payment {
  id: string;
  userId: string;
  method: 'bKash' | 'Nagad' | 'Rocket' | 'Card';
  reference: string;
  amount: number;
  timestamp: string;
}

export interface LostItem {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  location: string;
  status: 'claimed' | 'unclaimed';
  postedById: string;
}

export interface UserLostReport {
  id: string;
  userId: string;
  title: string;
  description: string;
  contact: string;
  submittedAt: string;
}

export interface Feedback {
  id: string;
  userId: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface Complaint {
  id: string;
  userId: string;
  title: string;
  description: string;
  urgency: 'low' | 'medium' | 'high';
  status: 'open' | 'closed';
  submittedAt: string;
}
