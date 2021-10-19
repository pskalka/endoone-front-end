import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'prettyLabel'
})
export class PrettyLabelPipe implements PipeTransform {

  transform(input: string): string {
    // pskalka replace any _ character with a space, then capitalize the first letter of each resulting word
    let result: string = input.length === 0 ? '' :
      input.replace(/_/g, txt => " ").replace(/\w\S*/g, (txt => txt[0].toUpperCase() + txt.substr(1).toLowerCase()));
    return result;
  }

}
