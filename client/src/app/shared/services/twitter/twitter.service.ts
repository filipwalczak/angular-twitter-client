import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { NotificationService } from '../notification/notification.service';

import { Tweet } from '../../models/tweet.model';
import { User } from '../../models/user.model';

@Injectable()
export class TwitterService {

  constructor(private httpClient: HttpClient,
              private notificationService: NotificationService) { }

  defaultOptions = {
    withCredentials: true
  }

  devServerUrl = "http://127.0.0.1:8080";

  private simplifyUser(userData): User {
    return {
      name: userData.name,
      screenName: userData.screen_name,
      profileImg: userData.profile_image_url_https,
      profileImgBig: userData.profile_image_url_https.replace('_normal', ''),
      location: userData.location,
      url: 'https://twitter.com/' + userData.screen_name,
      description: userData.description,
      followersCount: userData.followers_count,
      friendsCount: userData.friends_count,
      tweetsCount: userData.statuses_count,
      twitterId: userData.id_str
    }
  }

  private simplifyTweet(tweetData): Tweet {
    return  {
      author: tweetData.user.name,
      authorScreenName: tweetData.user.screen_name,
      authorProfileImg: tweetData.user.profile_image_url_https,
      text: tweetData.text,
      date: tweetData.created_at,
      retweetCount: tweetData.retweet_count,
      favoriteCount: tweetData.favorite_count,
      replyCount: tweetData.reply_count,
      quoteCount: tweetData.quote_count,
      twitterId: tweetData.id_str,
      tweetUrl: `https://twitter.com/${tweetData.user.screen_name}/status/${tweetData.id_str}`
    }
  }

  private simplifyArray(arr: any[], simpFunction: (e: any) => User | Tweet): any[] {
    return arr.map(simpFunction)
  }

  getUser(): Observable<User> {
    return this.httpClient
      .get(this.devServerUrl + '/user', this.defaultOptions)
      .map((res: any) => {
        return this.simplifyUser(res);
      })
      .catch((err) => {
        return Observable.throw('Could not get user data. Try again later.');
      });
  }

  getTweets(): Observable<Tweet[]> {
    return this.httpClient
      .get(this.devServerUrl + '/tweets', this.defaultOptions)
      .map((res: any[]) => {
        return this.simplifyArray(res, this.simplifyTweet);
      })
      .catch((err) => {
        return Observable.throw('Could not get tweets. Try again later.');
      });
  }

  getFollowers(): Observable<User[]> {
    return this.httpClient
      .get(this.devServerUrl + '/followers', this.defaultOptions)
      .map((res: any) => {
          return this.simplifyArray(res.users, this.simplifyUser)
      })
      .catch((err) => {
        return Observable.throw('Could not get the followers list. Try again later.')
      });
  }

  getFriends(): Observable<User[]> {
    return this.httpClient
      .get(this.devServerUrl + '/friends', this.defaultOptions)
      .map((res: any) => {
        return this.simplifyArray(res.users, this.simplifyUser)
      })
      .catch((err) => {
        return Observable.throw('Could not get the friends list. Try again later.')
      });
  }

  postTweet(formValue) {
    let text = formValue['tweet-text'];
    return this.httpClient
      .post(this.devServerUrl + '/tweets', {status: text}, this.defaultOptions)
      .map((res: any) => {
        this.notificationService.notify('Tweet posted succesfully!')
      })
      .catch((err) => {
        return Observable.throw('Tweet could not be posted. Try again later.')
      });
  }
}
