import { Component, input, OnInit, output } from '@angular/core';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { DropdownValue } from '@app/models/inputs.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subject, tap } from 'rxjs';

@Component({
  selector: 'app-table-header',
  templateUrl: './table-header.component.html',
  styleUrls: ['./table-header.component.scss'],
  standalone: true,
  imports: [
    InputTextModule,
    InputIconModule,
    IconFieldModule,
    SelectModule,
    CommonModule,
    FormsModule,
  ],
})
export class TableHeaderComponent implements OnInit {
  enableSearch = input.required<boolean>();
  enableSort = input.required<boolean>();
  enableFilter = input.required<boolean>();
  categoryFilterValues = input.required<DropdownValue[]>();

  searchKeyEvent = output<string>();
  categoryChanged = output<string>();

  searchKey = '';
  searchKeySubject = new Subject<string>();

  selectedCategory: DropdownValue | undefined;
  selectedCategorySubject = new Subject<string>();

  constructor() {}

  onSearch() {
    this.searchKeySubject.next(this.searchKey);
  }

  emitSearchKey() {
    this.searchKeyEvent.emit(this.searchKey);
  }

  onCategoryChange() {
    this.selectedCategorySubject.next(this.selectedCategory?.value ?? '');
  }

  emitCategory(category: string) {
    this.categoryChanged.emit(category);
  }

  listenToCategoryChanges() {
    this.selectedCategorySubject
      .pipe(tap((category) => this.emitCategory(category)))
      .subscribe();
  }

  listenToSearchChanges() {
    this.searchKeySubject
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        tap(() => this.emitSearchKey())
      )
      .subscribe();
  }

  ngOnInit() {
    this.listenToSearchChanges();
    this.listenToCategoryChanges();
  }
}
