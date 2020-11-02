import { Pipe, PipeTransform } from '@angular/core';
import { renderDate } from '../../../../../../../../main/src/utils';

@Pipe({
  name: 'date',
})
export class DatePipe implements PipeTransform {
  transform(value: any, ...args: unknown[]): unknown {
    if (!value) {
      return '';
    }
    const date = new Date(value);
    const result = renderDate(date);
    return result;
  }
}
