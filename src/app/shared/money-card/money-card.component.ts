import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-money-card',
  imports: [CommonModule],
  templateUrl: './money-card.component.html',
  styleUrl: './money-card.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MoneyCardComponent {
  label = input.required<string>();
  quantity = input.required<number>();
  isMain = input.required<boolean>();

  constructor() {}

  getCardClass() {
    return this.isMain() ? 'main-card' : 'default-card';
  }

  ngOnInit() {}
}
