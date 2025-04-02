export interface TableColumn {
  header: string;
  value: string;
  columnType?: ColumnType;
  tableAlign?: 'left' | 'right';
}

export interface TableData {
  page: number;
  limit: number;
}

export enum ColumnType {
  DATE = 'date',
  CUSTOM = 'custom',
}
