import { Pipe, PipeTransform } from '@angular/core';
import { renderTime } from '../../../../../../../../main/src/utils';

@Pipe({
  name: 'time',
})
export class TimePipe implements PipeTransform {
  transform(value: any, ...args: unknown[]): unknown {
    if (!value) {
      return '';
    }
    const date = new Date(value);
    const result = renderTime(date);
    return result;
  }
}
