import { Component, input } from '@angular/core';
import { TableModule } from 'primeng/table';
import { TableColumn } from '../../models/table.model';

@Component({
  selector: 'app-table',
  imports: [TableModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  standalone: true,
})
export class TableComponent<T> {
  data = input.required<T[]>();
  cols = input.required<TableColumn[]>();

  ngOnInit() {
    console.log(this.data());
  }
}
