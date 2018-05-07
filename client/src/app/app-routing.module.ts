import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { AuthGuardService } from './auth/auth-guard.service';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { TweetComposerComponent } from './tweet-composer/tweet-composer.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'profile', canActivate: [AuthGuardService], component: ProfileComponent },
  { path: 'tweet-composer', canActivate: [AuthGuardService], component: TweetComposerComponent },
  { path: '**', redirectTo: '/'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
