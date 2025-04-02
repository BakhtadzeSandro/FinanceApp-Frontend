import { Component, inject, OnInit, signal } from '@angular/core';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { Router, RouterModule } from '@angular/router';
import { SidebarItemRoute, SidenavItem } from '@app/models/sidebar.model';
import { UsersService } from '@app/services/users.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  standalone: true,
  imports: [SidenavComponent, RouterModule],
})
export class MainComponent implements OnInit {
  private usersService = inject(UsersService);
  private router = inject(Router);

  selectedPage = signal<SidebarItemRoute>(SidebarItemRoute.OVERVIEW);

  get currentUser() {
    return this.usersService.currentUser();
  }

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

  setSelectedPage() {
    const currentUrl = this.router.url.substring(1);
    this.selectedPage.set(currentUrl as SidebarItemRoute);
  }

  ngOnInit() {
    this.setSelectedPage();
    this.usersService
      .getCurrentUser()
      .subscribe((val) => this.usersService.currentUser.set(val));
  }
}
