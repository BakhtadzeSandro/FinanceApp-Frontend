import { FormControl } from '@angular/forms';
import { DropdownValue } from './inputs.model';

export interface TransactionForm {
  category: FormControl<string | DropdownValue | undefined>;
  date: FormControl<Date | undefined>;
  type: FormControl<TransactionType | undefined>;
  recipientOrSender: FormControl<string | undefined>;
  amount: FormControl<number | undefined>;
}

export interface Transaction {
  date: Date;
  dateAdded: Date;
  type: TransactionType | string;
  recipientOrSender: string;
  amount: number;
  category?: string | DropdownValue;
  _id?: string;
  userId?: string;
}

export enum TransactionType {
  INCOME = 'income',
  EXPENSE = 'expense',
}
