export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  currentBalance: number;
  income: number;
  expense: number;
  username: string;
  avatar?: string;
}
