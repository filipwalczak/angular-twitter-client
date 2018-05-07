import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocialListComponent } from './components/social-list/social-list.component';
import { AtPipe } from './pipes/at.pipe';
import { ErrorsComponent } from './errors/errors.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    SocialListComponent,
    ErrorsComponent,
    AtPipe
  ],
  declarations: [
    SocialListComponent,
    AtPipe,
    ErrorsComponent
  ]
})
export class SharedModule { }
