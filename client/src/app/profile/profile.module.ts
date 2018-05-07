import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { SocialListComponent } from '../shared/components/social-list/social-list.component';

import { UserCardComponent } from './user-card/user-card.component';
import { ProfileComponent } from './profile.component';
import { TweetListComponent } from './tweet-list/tweet-list.component';
import { FollowersListComponent } from './followers-list/followers-list.component';
import { FriendsListComponent } from './friends-list/friends-list.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    ProfileComponent
  ],
  providers: [
  ],
  declarations: [UserCardComponent, ProfileComponent, TweetListComponent, FollowersListComponent, FriendsListComponent]
})
export class ProfileModule { }
