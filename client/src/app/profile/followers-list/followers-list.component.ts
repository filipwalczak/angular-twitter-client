import { Component, OnInit } from '@angular/core';

import { TwitterService } from '../../shared/services/twitter/twitter.service';
import { SocialListComponent } from '../../shared/components/social-list/social-list.component';
import { User } from '../../shared/models/user.model';

@Component({
  selector: 'app-followers-list',
  templateUrl: './followers-list.component.html',
  styleUrls: ['./followers-list.component.css']
})
export class FollowersListComponent implements OnInit {

  followers: User[];
  title = "Followers"
  errMsg: string;

  constructor(private twitterService: TwitterService) { }

  ngOnInit() {
    this.twitterService.getFollowers().subscribe((followers: User[]) => {
      this.followers = followers;
    });
  }
}
