import { Component, OnInit } from '@angular/core';
import { TwitterService } from '../../shared/services/twitter/twitter.service';

import { User } from '../../shared/models/user.model';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit {

  user: User = <User>{};

  constructor(private twitterService: TwitterService) { }

  ngOnInit() {
      this.twitterService.getUser().subscribe((user: User) => {
        this.user = user;
      })
  }

}
