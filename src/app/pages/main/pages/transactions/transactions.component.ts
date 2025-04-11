import { Component, OnInit, signal } from '@angular/core';
import { TableComponent } from '@app/shared/table/table.component';
import { TransactionsConfig } from './transactions.config';
import { ColumnType, TableColumn, TableData } from '@app/models/table.model';
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
import { finalize, tap } from 'rxjs';

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

  loading = signal<boolean>(false);

  tableData = signal<TableData>({
    paginator: {
      limit: 10,
      page: 1,
    },
    filter: {},
    searchKey: '',
  });

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
      this.tableData.set({
        ...this.tableData(),
        paginator: {
          ...this.tableData().paginator,
          limit: event.rows,
          page: event.page + 1,
        },
      });
      this.firstRowIndex.set(event.page + 1 * event.rows);
    }
    this.getData();
  }

  handleSearch(searchKey: string) {
    this.tableData.set({
      ...this.tableData(),
      paginator: {
        ...this.tableData().paginator,
        page: 0,
      },
      searchKey,
    });
    this.getData();
  }

  handleCategoryChanges(category: string) {
    this.tableData.set({
      ...this.tableData(),
      filter: {
        category: category ?? undefined,
      },
    });
    this.getData();
  }

  getData() {
    this.loading.set(true);
    this.transactionsService
      .getTransactionsList(this.tableData())
      .pipe(
        tap((val) => {
          this.tableData.set({
            ...this.tableData(),
            paginator: val.paginator,
          });
          this.data.set(val.data);
        }),
        finalize(() => this.loading.set(false))
      )
      .subscribe();
  }

  ngOnInit() {
    this.transactionColumns.set(this.config.getTransactionsTableColumns());
    this.categoryFilterValues.set(this.config.getCategories());
    this.getData();
  }
}
