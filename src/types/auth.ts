
export type UserRole = 'buyer' | 'seller' | 'admin' | 'cashier' | 'inventory' | null;

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  managedBy?: string;
}
