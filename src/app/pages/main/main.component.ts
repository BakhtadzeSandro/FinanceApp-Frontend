import { Component, OnInit, signal } from '@angular/core';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { RouterModule } from '@angular/router';
import { SidebarItemRoute, SidenavItem } from '../../models/sidebar.model';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  standalone: true,
  imports: [SidenavComponent, RouterModule],
})
export class MainComponent implements OnInit {
  selectedPage = signal<SidebarItemRoute>(SidebarItemRoute.OVERVIEW);

  sidenavItems = signal<SidenavItem[]>([
    {
      icon: 'pi pi-home',
      label: 'Overview',
      route: SidebarItemRoute.OVERVIEW,
    },
    {
      icon: 'pi pi-wallet',
      label: 'Transactions',
      route: SidebarItemRoute.TRANSACTIONS,
    },
    {
      icon: 'pi pi-chart-bar',
      label: 'Budgets',
      route: SidebarItemRoute.BUDGETS,
    },
    {
      icon: 'pi pi-inbox',
      label: 'Pots',
      route: SidebarItemRoute.POTS,
    },
    {
      icon: 'pi pi-calendar',
      label: 'Recurring Bills',
      route: SidebarItemRoute.RECURRING_BILLS,
    },
  ]);

  constructor() {}

  ngOnInit() {}
}
