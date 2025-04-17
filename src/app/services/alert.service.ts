import { inject, Injectable } from '@angular/core';
import swal, { SweetAlertOptions } from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor() {}

  callSwal(args: SweetAlertOptions) {
    return swal.fire(args);
  }

  success(message: string) {
    return this.callSwal({
      title: 'Success',
      text: message,
      icon: 'success',
      confirmButtonText: 'Ok',
      allowEscapeKey: true,
      customClass: {
        container: 'alert',
      },
    });
  }

  deleteWarning() {
    return this.callSwal({
      title: 'Are you sure you want to delete transaction?',
      text: 'You will not be able to revert this!',
      icon: 'warning',
      confirmButtonText: 'Yes',
      showCancelButton: true,
      allowEscapeKey: true,
      customClass: {
        container: 'alert',
      },
    });
  }

  error(message: string) {
    return this.callSwal({
      icon: 'error',
      title: 'Oops...',
      text: message ?? 'Something Went Wrong!',
      confirmButtonText: 'Ok',
      allowEscapeKey: true,
      customClass: {
        container: 'alert',
      },
    });
  }
}
