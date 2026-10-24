// Mock Data & Constants for Rati B2C Checkout

export const BRAND_CONFIG = {
  id: 'aarav-naturals',
  name: 'Aarav Naturals',
  initials: 'AN',
  logo: '/images/aarav-logo.jpg',
  tagline: 'Pure Ayurvedic Formulations',
};

export const INITIAL_PRODUCT = {
  id: 'prod-kumkumadi',
  name: 'Kumkumadi Brightening Face Oil, 30 ml',
  price: 2399,
  initials: 'KF',
  image: '/images/kumkumadi-oil.jpg',
  quantity: 1,
};

export const RECOMMENDED_ADDONS = [
  {
    id: 'addon-1',
    name: 'Tejasvi Rose Water Mist, 50 ml',
    price: 349,
    initials: 'TR',
    image: '/images/rose-mist.jpg',
  },
  {
    id: 'addon-2',
    name: 'Centella Soothing Face Wash, 100 ml',
    price: 499,
    initials: 'CF',
    image: '/images/centella-wash.jpg',
  },
  {
    id: 'addon-3',
    name: 'Saffron Radiance Lip Butter, 15 g',
    price: 249,
    initials: 'SR',
    image: '/images/saffron-lip.jpg',
  },
  {
    id: 'addon-4',
    name: 'Ubtan Glow Exfoliating Scrub, 50 g',
    price: 399,
    initials: 'UG',
    image: '/images/ubtan-scrub.jpg',
  },
];

export const COUPONS = [
  {
    code: 'WELCOME10',
    title: '10% off up to ₹250',
    condition: '10% off on items (capped at ₹250)',
    type: 'percentage',
    value: 10,
    cap: 250,
    minOrder: 0,
  },
  {
    code: 'FREESHIP',
    title: 'Free Shipping',
    condition: 'Free shipping on orders above ₹999',
    type: 'free_shipping',
    value: 0,
    minOrder: 1000,
  },
  {
    code: 'PREPAID5',
    title: '5% Prepaid Benefit',
    condition: '5% off on online payment (does not stack with prepaid saving)',
    type: 'prepaid',
    value: 5,
    minOrder: 0,
  },
];

export const PINCODE_MAP = {
  '400001': {
    city: 'Mumbai',
    state: 'Maharashtra',
    deliveryDate: 'Tomorrow, by 8 PM',
    transitDays: 1,
  },
  '110001': {
    city: 'New Delhi',
    state: 'Delhi',
    deliveryDate: 'Sat, 25 Oct',
    transitDays: 2,
  },
  '560001': {
    city: 'Bengaluru',
    state: 'Karnataka',
    deliveryDate: 'Tomorrow, by 8 PM',
    transitDays: 1,
  },
  '600001': {
    city: 'Chennai',
    state: 'Tamil Nadu',
    deliveryDate: 'Sat, 25 Oct',
    transitDays: 2,
  },
  '700001': {
    city: 'Kolkata',
    state: 'West Bengal',
    deliveryDate: 'Sun, 26 Oct',
    transitDays: 3,
  },
  '411001': {
    city: 'Pune',
    state: 'Maharashtra',
    deliveryDate: 'Tomorrow, by 8 PM',
    transitDays: 1,
  },
  '380001': {
    city: 'Ahmedabad',
    state: 'Gujarat',
    deliveryDate: 'Sat, 25 Oct',
    transitDays: 2,
  },
  '500001': {
    city: 'Hyderabad',
    state: 'Telangana',
    deliveryDate: 'Tomorrow, by 8 PM',
    transitDays: 1,
  },
  '302001': {
    city: 'Jaipur',
    state: 'Rajasthan',
    deliveryDate: 'Sun, 26 Oct',
    transitDays: 3,
  },
  '226001': {
    city: 'Lucknow',
    state: 'Uttar Pradesh',
    deliveryDate: 'Sun, 26 Oct',
    transitDays: 3,
  },
};

export const DEMO_CONFIG = {
  demoOtp: '1234',
  returningBuyerNumber: '9876543210',
  orderId: 'RATI-100234',
  courierName: 'Blue Dart',
  codFee: 49,
};

export const RETURNING_BUYER_DATA = {
  fullName: 'Priya Sharma',
  phone: '9876543210',
  pincode: '560001',
  houseStreet: 'Flat 402, Green Glen Layout, Bellandur',
  landmark: 'Near Central Mall',
  city: 'Bengaluru',
  state: 'Karnataka',
  addressType: 'Home',
};
