import { Component, input, OnInit } from '@angular/core';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { DropdownValue } from '../../../models/inputs.model';

@Component({
  selector: 'app-table-header',
  templateUrl: './table-header.component.html',
  styleUrls: ['./table-header.component.scss'],
  standalone: true,
  imports: [InputTextModule, InputIconModule, IconFieldModule, SelectModule],
})
export class TableHeaderComponent implements OnInit {
  enableSearch = input.required<boolean>();
  enableSort = input.required<boolean>();
  enableFilter = input.required<boolean>();
  categoryFilterValues = input.required<DropdownValue[]>();

  constructor() {}

  ngOnInit() {}
}
