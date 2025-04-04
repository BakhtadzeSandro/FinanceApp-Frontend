import { HttpClient, HttpParams, httpResource } from '@angular/common/http';
import { effect, Injectable, signal } from '@angular/core';
import { Transaction } from '@app/models/transaction.model';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { ListResponse } from '@app/models/api.model';

export const categoryMap = {
  general: 'General',
  diningOut: 'Dining Out',
  groceries: 'Groceries',
  entertainment: 'Entertainment',
  transportation: 'Transportation',
  lifestyle: 'Lifestyle',
  bills: 'Bills',
  personalCare: 'Personal Care',
  shopping: 'Shopping',
  education: 'Education',
};

@Injectable({
  providedIn: 'root',
})
export class TransactionsService {
  private endpoint = 'transactions';

  page = signal(0);
  limit = signal(10);
  searchKey = signal('');
  selectedCategory = signal('');

  constructor(private httpClient: HttpClient) {}

  addTransaction(
    createTransactionDto: Transaction
  ): Observable<ListResponse<Transaction[]>> {
    return this.httpClient.post<ListResponse<Transaction[]>>(
      `${environment.apiUrl}${this.endpoint}/add-transaction`,
      createTransactionDto
    );
  }

  transactions = httpResource<ListResponse<Transaction[]>>(
    () => {
      const params = new URLSearchParams({
        page: (this.page() + 1).toString(),
        limit: this.limit().toString(),
      });

      if (this.searchKey()) {
        params.set('search', this.searchKey());
      }

      if (this.selectedCategory()) {
        params.set('category', this.selectedCategory());
      }

      return `${environment.apiUrl}${this.endpoint}?${params.toString()}`;
    },
    {
      parse(value: unknown): ListResponse<Transaction[]> {
        const transactions = value as ListResponse<Transaction[]>;

        transactions.data.forEach((val) => {
          val.type = val.type.charAt(0).toUpperCase() + val.type.slice(1);
        });

        return transactions;
      },
    }
  );

  updatePagination(newPage: number, newLimit: number) {
    this.page.set(newPage);
    this.limit.set(newLimit);
  }

  // getTransactionsList(
  //   page: number,
  //   limit: number
  // ): Observable<ListResponse<Transaction[]>> {
  //   const params = new HttpParams().set('page', page).set('limit', limit);
  //   return this.httpClient.get<ListResponse<Transaction[]>>(
  //     `${environment.apiUrl}${this.endpoint}`,
  //     {
  //       params,
  //     }
  //   );
  // }
}
