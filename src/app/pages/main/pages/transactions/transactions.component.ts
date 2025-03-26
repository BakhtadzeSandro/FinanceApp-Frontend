import { Component, OnInit, signal } from '@angular/core';
import { TableComponent } from '../../../../shared/table/table.component';
import { TransactionsConfig } from './transactions.config';
import { TableColumn } from '../../../../models/table.model';
import { DropdownValue } from '../../../../models/inputs.model';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
  standalone: true,
  imports: [TableComponent],
  providers: [TransactionsConfig],
})
export class TransactionsComponent implements OnInit {
  transactionColumns = signal<TableColumn[]>([]);
  categoryFilterValues = signal<DropdownValue[]>([]);
  data = signal<any>([]);

  constructor(private config: TransactionsConfig) {}

  ngOnInit() {
    this.transactionColumns.set(this.config.getTransactionsTableColumns());
    this.categoryFilterValues.set(this.config.getCategories());
    this.data.set(this.config.getMockedData());
  }
}
