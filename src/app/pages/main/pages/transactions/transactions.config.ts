import { Injectable } from '@angular/core';
import { TableColumn } from '../../../../models/table.model';

@Injectable()
export class TransactionsConfig {
  constructor() {}

  getTransactionsTableColumns(): TableColumn[] {
    return [
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
        category: 'Test Category',
        transactionDate: '11/11/2025',
        type: 'Income',
        amount: 1500,
      },
    ];
  }
}
