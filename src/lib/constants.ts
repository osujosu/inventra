export const APP_NAME = 'Inventra';
export const APP_TAGLINE = 'Smart Inventory & Business Management';
export const APP_DESCRIPTION =
  'Modern inventory and business management system for tech retail businesses.';

export const ROUTES = {
  // Public
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',

  // App
  DASHBOARD: '/dashboard',
  POS: '/pos',
  PRODUCTS: '/products',
  CATEGORIES: '/products/categories',
  SERIAL_INVENTORY: '/serial-inventory',
  STOCK_IN: '/stock-in',
  STOCK_OUT: '/stock-out',
  CUSTOMERS: '/customers',
  SUPPLIERS: '/suppliers',
  EMPLOYEES: '/employees',
  EXPENSES: '/expenses',
  WARRANTY_CLAIMS: '/warranty-claims',
  REPORTS: '/reports',
  SETTINGS: '/settings',
} as const;

export const CURRENCY = {
  code: 'USD',
  symbol: '$',
  locale: 'en-US',
} as const;

export const PAGINATION = {
  defaultPageSize: 10,
  pageSizeOptions: [10, 20, 50, 100],
} as const;

export const SERIAL_STATUS = {
  IN_STOCK: 'in_stock',
  SOLD: 'sold',
  RESERVED: 'reserved',
  DEFECTIVE: 'defective',
  IN_REPAIR: 'in_repair',
  SCRAPPED: 'scrapped',
} as const;

export const ITEM_CONDITION = {
  NEW: 'new',
  GOOD: 'good',
  DAMAGED: 'damaged',
  DEFECTIVE: 'defective',
} as const;

export const WARRANTY_CLAIM_STATUS = {
  PENDING: 'pending',
  IN_REVIEW: 'in_review',
  IN_REPAIR: 'in_repair',
  REPAIRED: 'repaired',
  REPLACED: 'replaced',
  REJECTED: 'rejected',
  CLOSED: 'closed',
} as const;

export const WARRANTY_CLAIM_TYPE = {
  CUSTOMER_TO_STORE: 'customer_to_store',
  STORE_TO_SUPPLIER: 'store_to_supplier',
  SUPPLIER_TO_STORE: 'supplier_to_store',
} as const;

export const PAYMENT_METHOD = {
  CASH: 'cash',
  CARD: 'card',
  TRANSFER: 'transfer',
} as const;

export const TRANSACTION_STATUS = {
  COMPLETED: 'completed',
  PENDING: 'pending',
  VOIDED: 'voided',
} as const;

export const EXPENSE_CATEGORIES = [
  'Rent',
  'Utilities',
  'Supplies',
  'Marketing',
  'Maintenance',
  'Salary',
  'Other',
] as const;

export const LOW_STOCK_THRESHOLD = 10;
export const WARRANTY_ALERT_DAYS = 30;