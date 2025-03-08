import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  OnInit,
} from '@angular/core';
import { SidenavItem } from '../../../../models/sidebar.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidenavComponent implements OnInit {
  sidenavItems = input.required<SidenavItem[]>();

  isCollapsed = false;

  private router = inject(Router);

  constructor() {}

  toggleSidenav() {
    this.isCollapsed = !this.isCollapsed;
  }

  navigate(route: string) {
    this.router.navigate([route]);
  }

  ngOnInit() {}
}
