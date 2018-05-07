import { ErrorHandler, Injectable, Injector} from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { NotificationService } from '../services/notification/notification.service';

@Injectable()
export class ErrorsHandler implements ErrorHandler {
  constructor(
    private injector: Injector,
  ) {}

  handleError(error: Error | HttpErrorResponse) {
    const notificationService = this.injector.get(NotificationService);

    if (error instanceof HttpErrorResponse) {
      if (!navigator.onLine) {
        return notificationService.notify('No Internet Connection');
      }
      return notificationService.notify(`${error.status} - ${error.message}`);
    } else {
      return notificationService.notify(error);
    }
  }
}
