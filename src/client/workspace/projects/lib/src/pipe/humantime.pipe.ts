import { Pipe, PipeTransform } from '@angular/core';

const mapHour = (hour) => {
  hour = +hour % 12;
  hour = hour === 0 ? '12' : hour % 12;
  return hour;
};
const mapAm = (hour) => (hour < 12 ? 'AM' : 'PM');

@Pipe({
  name: 'humantime',
})
export class HumantimePipe implements PipeTransform {
  transform(value: any, ...args: unknown[]): unknown {
    if (!value) {
      return '';
    }
    const [hour, min] = value.split(':');
    const result = `${mapHour(hour)}:${min} ${mapAm(hour)}`;
    // console.log({ result });
    return result;
  }
}
