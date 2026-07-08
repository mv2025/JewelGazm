import goldCelesteRing from '@/assets/Featured-Products/gold-celeste-ring.png';
import goldSirenBand from '@/assets/Featured-Products/gold-siren-band.png';
import silverGentsRing from '@/assets/Featured-Products/silver-gents-ring.png';
import goldAuraNecklace from '@/assets/Featured-Products/gold-aura-necklace.png';

export interface Order {
  id: string;
  date: string;
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  total: number;
  items: {
    name: string;
    image: string;
    quantity: number;
    price: number;
  }[];
}

export interface Address {
  id: string;
  type: 'Shipping' | 'Billing';
  isDefault: boolean;
  fullName: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  phone: string;
}

export interface PaymentMethod {
  id: string;
  type: 'Credit Card' | 'UPI' | 'Wallet';
  provider: string;
  last4?: string;
  expiry?: string;
  isDefault: boolean;
}

export interface Certificate {
  id: string;
  productName: string;
  issuer: 'GIA' | 'IGI';
  issueDate: string;
  status: 'Verified';
  image: string;
}

export interface SavedCollection {
  id: string;
  name: string;
  coverImage: string;
  itemCount: number;
}

export interface SpecialDate {
  id: string;
  name: string;
  date: string;
  type: 'Anniversary' | 'Birthday' | 'Other';
  reminderOn: boolean;
}

export interface NotificationSettings {
  orderUpdates: boolean;
  priceDrops: boolean;
  newCollections: boolean;
  wishlistRestock: boolean;
}

export const mockOrders: Order[] = [
  {
    id: 'JG10245',
    date: '12 Oct 2025',
    status: 'Delivered',
    total: 45999,
    items: [
      {
        name: 'Gold Celeste Ring',
        image: goldCelesteRing,
        quantity: 1,
        price: 45999,
      }
    ]
  },
  {
    id: 'JG09812',
    date: '04 Sep 2025',
    status: 'Shipped',
    total: 32500,
    items: [
      {
        name: 'Gold Siren Band',
        image: goldSirenBand,
        quantity: 1,
        price: 32500,
      }
    ]
  }
];

export const mockAddresses: Address[] = [
  {
    id: 'addr-1',
    type: 'Shipping',
    isDefault: true,
    fullName: 'Mridul Verma',
    street: '123 Luxury Lane, Apt 4B',
    city: 'Mumbai',
    state: 'Maharashtra',
    zip: '400001',
    country: 'India',
    phone: '+91 98765 43210'
  }
];

export const mockPaymentMethods: PaymentMethod[] = [
  {
    id: 'pm-1',
    type: 'Credit Card',
    provider: 'Visa',
    last4: '4242',
    expiry: '12/28',
    isDefault: true,
  },
  {
    id: 'pm-2',
    type: 'UPI',
    provider: 'Google Pay',
    isDefault: false,
  }
];

export const mockCertificates: Certificate[] = [
  {
    id: 'cert-1',
    productName: 'Silver Gents Ring',
    issuer: 'IGI',
    issueDate: '17 May 2025',
    status: 'Verified',
    image: silverGentsRing
  }
];

export const mockSavedCollections: SavedCollection[] = [
  {
    id: 'sc-1',
    name: 'Wedding Collection',
    coverImage: goldAuraNecklace,
    itemCount: 4
  },
  {
    id: 'sc-2',
    name: 'Daily Wear',
    coverImage: goldSirenBand,
    itemCount: 12
  }
];

export const mockSpecialDates: SpecialDate[] = [
  {
    id: 'sd-1',
    name: 'Anniversary',
    date: '12 December',
    type: 'Anniversary',
    reminderOn: true,
  },
  {
    id: 'sd-2',
    name: "Mother's Birthday",
    date: '07 August',
    type: 'Birthday',
    reminderOn: true,
  }
];

export const mockNotificationSettings: NotificationSettings = {
  orderUpdates: true,
  priceDrops: true,
  newCollections: false,
  wishlistRestock: true,
};

export const mockSizes = {
  user: {
    ring: { us: '8', uk: 'P', eu: '57' },
    bracelet: { cm: '17', inches: '6.7' }
  },
  partner: {
    ring: { us: '7', uk: 'N', eu: '54' },
    bracelet: { cm: '15', inches: '5.9' }
  }
};
