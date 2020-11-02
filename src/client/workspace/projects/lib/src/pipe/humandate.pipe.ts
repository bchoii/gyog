import { Pipe, PipeTransform } from '@angular/core';
import { getDay, isToday } from 'date-fns';
import { renderDate } from '../../../../../../../../main/src/utils';

const getHumanday = (date: Date) =>
  isToday(date)
    ? 'Today'
    : [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ][getDay(date)];

@Pipe({
  name: 'humandate',
})
export class HumandatePipe implements PipeTransform {
  transform(value: any, ...args: unknown[]): unknown {
    if (!value) {
      return '';
    }
    const date = new Date(value);
    const result = `${renderDate(date)} (${getHumanday(date)})`;
    return result;
  }
}
