import {
  Component,
  input,
  output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { TableModule } from 'primeng/table';
import { TableColumn } from '@app/models/table.model';
import { TableHeaderComponent } from './table-header/table-header.component';
import { DropdownValue } from '@app/models/inputs.model';
import { CommonModule } from '@angular/common';
import { Paginator, PaginatorModule, PaginatorState } from 'primeng/paginator';
import { TableService } from '@app/services/table.service';

@Component({
  selector: 'app-table',
  imports: [TableModule, TableHeaderComponent, CommonModule, PaginatorModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  standalone: true,
})
export class TableComponent<T> {
  data = input.required<T[]>();
  cols = input.required<TableColumn[]>();
  categoryFilterValues = input.required<DropdownValue[]>();
  loading = input<boolean>(false);
  showPaginator = input<boolean>(false);
  rows = input.required<number>();
  total = input.required<number>();
  firstRowIndex = input<number>(0);
  enableSearch = input<boolean>(false);
  enableSort = input<boolean>(false);
  enableFilter = input<boolean>(false);
  rowTemplate = input<TemplateRef<unknown>>();

  pageChanged = output<PaginatorState>();
  emitSearchKeyEvent = output<string>();
  emitCategoryEvent = output<string>();
  emitRowSelectEvent = output<T>();

  selectedRows: T[] = [];

  @ViewChild('paginator') paginator: Paginator | undefined;

  constructor(private tableService: TableService) {}

  onSort(event: any) {
    console.log(event);
  }

  onRowSelect(rowData: T, event: any) {
    this.emitRowSelectEvent.emit(rowData);
  }

  onPageChange(event: PaginatorState) {
    this.pageChanged.emit(event);
  }

  emitSearchKey(event: string) {
    this.emitSearchKeyEvent.emit(event);
  }

  emitCategory(event: string) {
    this.emitCategoryEvent.emit(event);
  }

  ngAfterViewInit() {
    this.tableService.paginator.set(this.paginator);
  }
}
