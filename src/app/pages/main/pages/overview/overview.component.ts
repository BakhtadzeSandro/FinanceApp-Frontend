import { Component, OnInit, signal } from '@angular/core';
import { MoneyCardComponent } from '../../../../shared/money-card/money-card.component';
import { MoneyCardContent } from '../../../../models/money-card.model';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
  standalone: true,
  imports: [MoneyCardComponent],
})
export class OverviewComponent implements OnInit {
  moneyCards = signal<MoneyCardContent[]>([
    {
      label: 'Current Balance',
      quantity: '4,836.00',
      isMain: true,
    },
    {
      label: 'Income',
      quantity: '3,814.25',
      isMain: false,
    },
    {
      label: 'Expenses',
      quantity: '1,700.50',
      isMain: false,
    },
  ]);
  constructor() {}

  ngOnInit() {}
}
