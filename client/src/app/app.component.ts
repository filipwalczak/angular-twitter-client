import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { NotificationService } from './shared/services/notification/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  notification: string;
  showNotification: boolean;

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    this.notificationService
            .notification$
            .subscribe(message => {
              this.showNotification = true;
              this.notification = message;
            });
  }
}
