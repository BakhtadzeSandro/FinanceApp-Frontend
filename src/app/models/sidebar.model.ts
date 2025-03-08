export interface SidenavItem {
  icon: string;
  label: string;
  route: SidebarItemRoute;
  class?: string;
}

export enum SidebarItemRoute {
  OVERVIEW = 'overview',
  TRANSACTIONS = 'transactions',
  BUDGETS = 'budgets',
  POTS = 'pots',
  RECURRING_BILLS = 'recurring-bills',
}
