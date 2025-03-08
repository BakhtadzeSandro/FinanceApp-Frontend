import { Component, OnInit, signal } from '@angular/core';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { RouterModule } from '@angular/router';
import { SidenavItem } from '../../models/sidebar.model';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  standalone: true,
  imports: [SidenavComponent, RouterModule],
})
export class MainComponent implements OnInit {
  sidenavItems = signal<SidenavItem[]>([
    {
      icon: 'pi pi-home',
      label: 'Overview',
      route: 'overview',
    },
    {
      icon: 'pi pi-wallet',
      label: 'Transactions',
      route: 'transactions',
    },
    {
      icon: 'pi pi-chart-bar',
      label: 'Budgets',
      route: 'budgets',
    },
    {
      icon: 'pi pi-inbox',
      label: 'Pots',
      route: 'pots',
    },
    {
      icon: 'pi pi-calendar',
      label: 'Recurring Bills',
      route: 'recurring-bills',
    },
  ]);
  constructor() {}

  ngOnInit() {}
}
