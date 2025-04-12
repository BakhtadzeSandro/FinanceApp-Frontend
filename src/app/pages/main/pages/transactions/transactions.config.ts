import { Injectable } from '@angular/core';
import { ColumnType, TableColumn } from '@app/models/table.model';
import { DropdownValue } from '@app/models/inputs.model';

@Injectable({
  providedIn: 'root',
})
export class TransactionsConfig {
  constructor() {}

  getTransactionsTableColumns(): TableColumn[] {
    return [
      {
        header: 'Recipient / Sender',
        value: 'recipientOrSender',
        columnType: ColumnType.CUSTOM,
      },
      {
        header: 'Category',
        value: 'category',
        columnType: ColumnType.CUSTOM,
      },
      {
        header: 'Date Added',
        value: 'dateAdded',
        columnType: ColumnType.DATE,
      },
      {
        header: 'Transaction Date',
        value: 'date',
        columnType: ColumnType.DATE,
      },
      {
        header: 'Type',
        value: 'type',
        columnType: ColumnType.CUSTOM,
      },
      {
        header: 'Amount',
        value: 'amount',
        columnType: ColumnType.CUSTOM,
        tableAlign: 'right',
      },
    ];
  }

  getCategories(): DropdownValue[] {
    return [
      {
        label: 'General',
        value: 'general',
      },
      {
        label: 'Dining Out',
        value: 'diningOut',
      },
      {
        label: 'Groceries',
        value: 'groceries',
      },
      {
        label: 'Entertainment',
        value: 'entertainment',
      },
      {
        label: 'Transportation',
        value: 'transportation',
      },
      {
        label: 'Lifestyle',
        value: 'lifestyle',
      },
      {
        label: 'Bills',
        value: 'bills',
      },
      {
        label: 'Personal Care',
        value: 'personalCare',
      },
      {
        label: 'Shopping',
        value: 'shopping',
      },
      {
        label: 'Education',
        value: 'education',
      },
    ];
  }
}
