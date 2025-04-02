import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transactionsImagePipe',
  standalone: true,
})
export class TransactionsImagePipe implements PipeTransform {
  transform(category: string): string {
    const imageMap: { [key: string]: string } = {
      general: '/assets/images/general.png',
      diningOut: '/assets/images/spoon-and-fork.png',
      groceries: '/assets/images/grocery.png',
      entertainment: '/assets/images/content.png',
      transportation: '/assets/images/bus.png',
      lifestyle: '/assets/images/healthy-lifestyle.png',
      bills: '/assets/images/bill.png',
      personalCare: '/assets/images/personal-hygiene.png',
      shopping: '/assets/images/online-shopping.png',
      education: '/assets/images/education.png',
      profits: '/assets/images/profits.png',
    };

    return imageMap[category] || '/assets/images/profits.png';
  }
}
