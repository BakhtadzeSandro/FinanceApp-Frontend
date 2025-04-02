import { Component, inject, OnInit, signal } from '@angular/core';
import { MoneyCardComponent } from '@app/shared/money-card/money-card.component';
import { MoneyCardContent } from '@app/models/money-card.model';
import { UsersService } from '@app/services/users.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
  standalone: true,
  imports: [MoneyCardComponent],
})
export class OverviewComponent implements OnInit {
  private userService = inject(UsersService);

  currentUser = signal(this.userService.currentUser());

  moneyCards = signal<MoneyCardContent[]>([
    {
      label: 'Current Balance',
      quantity: this.currentUser()?.currentBalance ?? 0,
      isMain: true,
    },
    {
      label: 'Income',
      quantity: this.currentUser()?.income ?? 0,
      isMain: false,
    },
    {
      label: 'Expenses',
      quantity: this.currentUser()?.expense ?? 0,
      isMain: false,
    },
  ]);

  constructor() {}

  ngOnInit() {}
}
