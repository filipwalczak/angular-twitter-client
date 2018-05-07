import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import 'rxjs/add/operator/publish';


@Injectable()
export class NotificationService {

  private notification: BehaviorSubject<string> = new BehaviorSubject(null);
  readonly notification$: Observable<string> = this.notification.asObservable().publish().refCount();

  constructor() {}

  notify(message) {
    this.notification.next(message);
    setTimeout(() => this.notification.next(null), 2000);
  }

}
