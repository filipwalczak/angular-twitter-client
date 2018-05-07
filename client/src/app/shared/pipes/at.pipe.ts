import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'at'})
export class AtPipe implements PipeTransform {
  transform(twitterHandle: string): string {
    return '@' + twitterHandle;
  }
}
