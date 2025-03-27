import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  requestCount = 0;
  constructor(private spinnerService: NgxSpinnerService) {}

  loading() {
    this.requestCount++;
    this.spinnerService.show();
  }

  idle() {
    this.requestCount--;
    if (this.requestCount <= 0) {
      this.requestCount = 0;
      this.spinnerService.hide();
    }
  }
}
