import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

  constructor(private httpClient: HttpClient, private router: Router) {
    this.isSignedIn().subscribe((val) => {
      this.userSignedIn.next(val);
    })
  }

  private userSignedIn = new BehaviorSubject<boolean>(false);
  readonly userSignedIn$ = this.userSignedIn.asObservable();

  signIn() {
    this.httpClient.get('http://127.0.0.1:8080/login', {
      observe: 'body',
      responseType: 'json',
      withCredentials: true
    }).subscribe((res) => {
      window.location.href = res['url'];
    },(error) => {
      throw ('Could not log in. Please try again later.');
    })
  }

  signOut() {
    this.httpClient.get('http://127.0.0.1:8080/logout', {
      withCredentials: true
    }).subscribe((res) => {
      this.userSignedIn.next(false);
      this.router.navigate(['/']);
    }, (error) => {
      throw ('User is already logged out. Please refresh the page.');
    })
  }

  isSignedIn(): Observable<boolean> {
    return this.httpClient.get('http://127.0.0.1:8080/is-logged', {
      withCredentials: true
    }).map((res: any) => {
      return res.logged;
    })
  }
}
