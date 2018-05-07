import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TweetComposerComponent } from './tweet-composer.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    TweetComposerComponent
  ],
  declarations: [TweetComposerComponent]
})
export class TweetComposerModule { }
