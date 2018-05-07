import { Component, OnInit } from '@angular/core';
import { TwitterService } from '../../shared/services/twitter/twitter.service';

import { Tweet } from '../../shared/models/tweet.model';

@Component({
  selector: 'app-tweet-list',
  templateUrl: './tweet-list.component.html',
  styleUrls: ['./tweet-list.component.css']
})
export class TweetListComponent implements OnInit {

  tweetList: Tweet[];

  constructor(private twitterService: TwitterService) { }

  ngOnInit() {
    this.twitterService.getTweets().subscribe((tweets: Tweet[]) => {
      this.tweetList = tweets;
    })
  }

}
