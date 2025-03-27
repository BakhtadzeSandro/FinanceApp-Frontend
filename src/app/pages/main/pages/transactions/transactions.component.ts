import { Component, OnInit, signal } from '@angular/core';
import { TableComponent } from '../../../../shared/table/table.component';
import { TransactionsConfig } from './transactions.config';
import { TableColumn } from '../../../../models/table.model';
import { DropdownValue } from '../../../../models/inputs.model';
import { ButtonModule } from 'primeng/button';
import { DialogService } from 'primeng/dynamicdialog';
import { TransactionModalComponent } from './transaction-modal/transaction-modal.component';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
  standalone: true,
  imports: [TableComponent, ButtonModule],
  providers: [DialogService],
})
export class TransactionsComponent implements OnInit {
  transactionColumns = signal<TableColumn[]>([]);
  categoryFilterValues = signal<DropdownValue[]>([]);
  data = signal<any>([]);

  constructor(
    private config: TransactionsConfig,
    private dialogService: DialogService
  ) {}

  openTransactionDialog() {
    this.dialogService.open(TransactionModalComponent, {
      header: 'Add New Transaction',
      showHeader: true,
      closable: true,
      modal: true,
      width: '50vw',
      focusOnShow: false,
      dismissableMask: true,
      breakpoints: {
        '996px': '70vw',
      },
    });
  }

  ngOnInit() {
    this.transactionColumns.set(this.config.getTransactionsTableColumns());
    this.categoryFilterValues.set(this.config.getCategories());
    this.data.set(this.config.getMockedData());
  }
}
