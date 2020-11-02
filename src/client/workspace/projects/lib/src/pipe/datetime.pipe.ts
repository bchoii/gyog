import { Pipe, PipeTransform } from '@angular/core';
import { formatDistance, isFuture } from 'date-fns';
import { renderDatetime } from '../../../../../../../../main/src/utils';

@Pipe({
  name: 'datetime',
  pure: false,
})
export class DatetimePipe implements PipeTransform {
  transform(value: any, ...args: unknown[]): unknown {
    if (!value) {
      return '';
    }
    const now = new Date();
    const date = new Date(value);
    const distance = formatDistance(date, now);
    const relative1 = isFuture(date) ? `in ${distance}` : `${distance} ago`;
    // const relative2 = formatRelative(date, now);
    const result = `${renderDatetime(date)} (${relative1})`;
    return result;
  }
}
