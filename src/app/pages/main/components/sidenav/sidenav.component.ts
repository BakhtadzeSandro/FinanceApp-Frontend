import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  model,
  OnInit,
  ViewChild,
} from '@angular/core';
import { SidebarItemRoute, SidenavItem } from '@app/models/sidebar.model';
import { Router } from '@angular/router';
import { AuthService } from '@app/services/auth.service';
import { UsersService } from '@app/services/users.service';
import { AvatarModule } from 'primeng/avatar';
import { Popover, PopoverModule } from 'primeng/popover';
import {
  EditUserConfig,
  EditUserModalComponent,
} from '../edit-user-modal/edit-user-modal.component';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  standalone: true,
  imports: [CommonModule, AvatarModule, PopoverModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DialogService],
})
export class SidenavComponent implements OnInit {
  sidenavItems = input.required<SidenavItem[]>();
  isCollapsed = false;

  selectedPage = model<SidebarItemRoute>();

  @ViewChild('op') op!: Popover;

  private router = inject(Router);
  private authService = inject(AuthService);
  private usersService = inject(UsersService);
  private dialogService = inject(DialogService);

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

  openEditUserDialog() {
    this.op.hide();
    this.dialogService.open(EditUserModalComponent, {
      header: 'Edit User',
      showHeader: true,
      closable: true,
      modal: true,
      width: '50vw',
      focusOnShow: false,
      dismissableMask: true,
      breakpoints: {
        '996px': '70vw',
      },
      data: {
        userInfo: {
          firstName: this.currentUser?.firstName,
          lastName: this.currentUser?.lastName,
          username: this.currentUser?.username,
          email: this.currentUser?.email,
          avatar: this.currentUser?.avatar,
        },
        userId: this.currentUser?._id!,
      } satisfies EditUserConfig,
    });
  }

  ngOnInit() {}
}
