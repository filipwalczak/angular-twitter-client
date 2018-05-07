import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> {
                return this.authService.isSignedIn().catch(() => {
                  this.router.navigate(['/']);
                  return Observable.of(false);
                })
              }

}
