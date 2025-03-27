import { FormControl } from '@angular/forms';

export interface TransactionForm {
  category: FormControl<string | undefined>;
  date: FormControl<Date | undefined>;
  type: FormControl<TransactionType | undefined>;
  recipientOrSender: FormControl<string | undefined>;
  amount: FormControl<number | undefined>;
}

export enum TransactionType {
  INCOME = 'income',
  EXPENSE = 'expense',
}
