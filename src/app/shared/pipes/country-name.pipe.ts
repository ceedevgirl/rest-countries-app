import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'countryName'
})
export class CountryNamePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
