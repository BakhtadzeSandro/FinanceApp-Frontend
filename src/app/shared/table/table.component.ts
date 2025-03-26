import { Component, input } from '@angular/core';
import { TableModule } from 'primeng/table';
import { TableColumn } from '../../models/table.model';
import { TableHeaderComponent } from './table-header/table-header.component';
import { DropdownValue } from '../../models/inputs.model';

@Component({
  selector: 'app-table',
  imports: [TableModule, TableHeaderComponent],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  standalone: true,
})
export class TableComponent<T> {
  data = input.required<T[]>();
  cols = input.required<TableColumn[]>();
  categoryFilterValues = input.required<DropdownValue[]>();
  enableSearch = input<boolean>(true);
  enableSort = input<boolean>(true);
  enableFilter = input<boolean>(true);

  ngOnInit() {
    console.log(this.data());
  }
}
