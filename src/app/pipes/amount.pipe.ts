import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'amount',
})
export class AmountPipe implements PipeTransform {
  transform(value: number, currencySymbol: string = '$'): string {
    if (value == null) return '';

    const isNegative = value < 0;
    const absValue = Math.abs(value).toLocaleString();

    return isNegative
      ? `-${currencySymbol}${absValue}`
      : `${currencySymbol}${absValue}`;
  }
}
