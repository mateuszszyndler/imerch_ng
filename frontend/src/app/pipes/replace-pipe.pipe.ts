import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'replacePipe'
})
export class ReplacePipePipe implements PipeTransform {
  transform(value: string, searchValue: string, replaceValue: string): string {
    return value.replace(new RegExp(searchValue, 'g'), replaceValue);
  }

}
