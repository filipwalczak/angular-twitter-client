import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthService) { }

  signedIn: boolean;

  newSignedIn: Subscription;

  ngOnInit() {
    this.newSignedIn = this.authService.userSignedIn$.subscribe((val) => {
      this.signedIn = val;
    })
  }

  signIn() {
    this.authService.signIn();
  }

  signOut() {
    this.authService.signOut();
  }

}
