import { Component, OnInit, signal } from '@angular/core';
import { TableComponent } from '@app/shared/table/table.component';
import { TransactionsConfig } from './transactions.config';
import { ColumnType, TableColumn } from '@app/models/table.model';
import { DropdownValue } from '@app/models/inputs.model';
import { ButtonModule } from 'primeng/button';
import { DialogService } from 'primeng/dynamicdialog';
import { TransactionModalComponent } from './transaction-modal/transaction-modal.component';
import { Transaction, TransactionType } from '@app/models/transaction.model';
import { TransactionsService } from '@app/services/transactions.service';
import { PaginatorState } from 'primeng/paginator';
import { CommonModule } from '@angular/common';
import { TransactionsImagePipe } from 'src/app/pipes/transactions-image.pipe';
import { TransactionCategoryPipe } from 'src/app/pipes/transactionCategory.pipe';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
  standalone: true,
  imports: [
    TableComponent,
    ButtonModule,
    CommonModule,
    TransactionsImagePipe,
    TransactionCategoryPipe,
  ],
  providers: [DialogService],
})
export class TransactionsComponent implements OnInit {
  transactionColumns = signal<TableColumn[]>([]);
  categoryFilterValues = signal<DropdownValue[]>([]);
  data = signal<Transaction[]>([]);

  firstRowIndex = signal(0);
  columnType = ColumnType;
  transactionType = TransactionType;

  constructor(
    private config: TransactionsConfig,
    private dialogService: DialogService,
    public transactionsService: TransactionsService
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

  getAmountClass(transactionType: TransactionType) {
    return transactionType.toLowerCase() === TransactionType.EXPENSE
      ? 'expense'
      : 'income';
  }

  pageChangeHandler(event: PaginatorState) {
    if (event.page !== null && event.page !== undefined && event.rows) {
      this.transactionsService.updatePagination(event.page, event.rows);
      this.firstRowIndex.set(event.page * event.rows);
    }
  }

  handleSearch(searchKey: string) {
    this.transactionsService.page.set(0);
    this.transactionsService.searchKey.set(searchKey);
  }

  handleCategoryChanges(category: string) {
    this.transactionsService.page.set(0);
    this.transactionsService.selectedCategory.set(category);
  }

  ngOnInit() {
    this.transactionColumns.set(this.config.getTransactionsTableColumns());
    this.categoryFilterValues.set(this.config.getCategories());
  }
}
