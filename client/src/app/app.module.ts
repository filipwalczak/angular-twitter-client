import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderModule } from './header/header.module';
import { HomeModule } from './home/home.module';
import { ProfileModule } from './profile/profile.module';
import { TweetComposerModule } from './tweet-composer/tweet-composer.module';
import { SharedModule } from './shared/shared.module';

import { ErrorsHandler } from './shared/errors/errors-handler';
import { NotificationService } from './shared/services/notification/notification.service';
import { AuthService } from './auth/auth.service';
import { AuthGuardService } from './auth/auth-guard.service';
import { TwitterService } from './shared/services/twitter/twitter.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    HeaderModule,
    HomeModule,
    ProfileModule,
    TweetComposerModule,
    SharedModule
  ],
  providers: [
    AuthService,
    AuthGuardService,
    TwitterService,
    {
      provide: ErrorHandler,
      useClass: ErrorsHandler
    },
    NotificationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
