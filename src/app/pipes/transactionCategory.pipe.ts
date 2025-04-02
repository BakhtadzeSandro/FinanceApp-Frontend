import { Pipe, PipeTransform } from '@angular/core';
import { categoryMap } from '@app/services/transactions.service';

@Pipe({
  name: 'transactionCategoryPipe',
  standalone: true,
})
export class TransactionCategoryPipe implements PipeTransform {
  transform(category: string): string {
    return categoryMap[category as keyof typeof categoryMap] || category;
  }
}
