export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  isRecommended: boolean;
  isSpecial: boolean;
  available: boolean;
  prepTime: number; // in minutes
}

export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  sortOrder: number;
}

export interface CartItem extends MenuItem {
  quantity: number;
  notes?: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  customerInfo: {
    tableNumber?: string;
    roomNumber?: string;
    contactInfo?: string;
  };
  status: 'pending' | 'preparing' | 'ready' | 'completed';
  createdAt: Date;
  estimatedTime: number;
}

export interface Admin {
  id: string;
  username: string;
  password: string;
  name: string;
  role: 'admin' | 'chef';
}

export interface Review {
  id: string;
  orderId: string;
  menuItemId: string;
  rating: number; // 1-5 stars
  comment: string;
  customerInfo: {
    tableNumber?: string;
    roomNumber?: string;
  };
  createdAt: Date;
}