import { Paginator } from './api.model';

export interface TableColumn {
  header: string;
  value: string;
  columnType?: ColumnType;
  tableAlign?: 'left' | 'right';
}

export interface TableData {
  paginator: Paginator;
  filter: Record<string, string>;
  searchKey: string;
}

export enum ColumnType {
  DATE = 'date',
  CUSTOM = 'custom',
}
