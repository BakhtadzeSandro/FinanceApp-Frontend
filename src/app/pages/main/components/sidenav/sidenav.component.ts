import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  model,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import {
  SidebarItemRoute,
  SidenavItem,
} from '../../../../models/sidebar.model';
import { Router } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';
import { UsersService } from '../../../../services/users.service';
import { AvatarModule } from 'primeng/avatar';
import { Popover, PopoverModule } from 'primeng/popover';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  standalone: true,
  imports: [CommonModule, AvatarModule, PopoverModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidenavComponent implements OnInit {
  sidenavItems = input.required<SidenavItem[]>();
  isCollapsed = false;

  selectedPage = model<SidebarItemRoute>();

  @ViewChild('op') op!: Popover;

  private router = inject(Router);
  private authService = inject(AuthService);
  private usersService = inject(UsersService);

  get currentUser() {
    return this.usersService.currentUser();
  }

  constructor() {}

  toggleSidenav() {
    this.isCollapsed = !this.isCollapsed;
  }

  navigate(route: SidebarItemRoute) {
    this.selectedPage.set(route);
    this.router.navigate([route]);
  }

  togglePanel(event: MouseEvent) {
    this.op.toggle(event);
  }

  logout() {
    this.authService.logout();
  }

  ngOnInit() {}
}
