import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { TwitterService } from '../shared/services/twitter/twitter.service';

@Component({
  selector: 'app-tweet-composer',
  templateUrl: './tweet-composer.component.html',
  styleUrls: ['./tweet-composer.component.css']
})
export class TweetComposerComponent implements OnInit {

  constructor(private twitterService: TwitterService) { }

  ngOnInit() {
  }

  tweetBody = '';
  tweetMaxLength = 280;

  onSubmit(composer: any) {
    let newTweet = composer.value;
    composer.form.reset();
    this.twitterService.postTweet(newTweet).subscribe((res) => {
    }, (error) => {
      throw new Error(error);
    })
  }

}
