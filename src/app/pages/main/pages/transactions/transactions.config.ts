import { Injectable } from '@angular/core';
import { TableColumn } from '../../../../models/table.model';
import { DropdownValue } from '../../../../models/inputs.model';

@Injectable()
export class TransactionsConfig {
  constructor() {}

  getTransactionsTableColumns(): TableColumn[] {
    return [
      {
        header: 'Recipient / Sender',
        value: 'address',
      },
      {
        header: 'Category',
        value: 'category',
      },
      {
        header: 'Transaction Date',
        value: 'transactionDate',
      },
      {
        header: 'Type',
        value: 'type',
      },
      {
        header: 'Amount',
        value: 'amount',
      },
    ];
  }

  getMockedData() {
    return [
      {
        address: 'Emma Richardson',
        category: 'Test Category',
        transactionDate: '11/11/2025',
        type: 'Income',
        amount: 1500,
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
