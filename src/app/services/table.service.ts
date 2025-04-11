import { Injectable, signal } from '@angular/core';
import { Paginator } from 'primeng/paginator';

@Injectable({
  providedIn: 'root',
})
export class TableService {
  paginator = signal<Paginator | undefined>(undefined);
  constructor() {}
}
