import { Component, OnInit } from '@angular/core';
import { TwitterService } from '../../shared/services/twitter/twitter.service';
import { SocialListComponent } from '../../shared/components/social-list/social-list.component';
import { User } from '../../shared/models/user.model';

@Component({
  selector: 'app-friends-list',
  templateUrl: './friends-list.component.html',
  styleUrls: ['./friends-list.component.css']
})
export class FriendsListComponent implements OnInit {

  friends: User[];
  title = "People You Follow";

  constructor(private twitterService: TwitterService) { }

  ngOnInit() {
      this.twitterService.getFriends().subscribe((friends: User[]) => {
        this.friends = friends;
      })
  }
}
