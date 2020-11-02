import {
  addDays,
  addMinutes,
  differenceInMinutes,
  getHours,
  isAfter,
  isSaturday,
  isSunday,
  startOfDay,
  startOfHour,
} from 'date-fns';
import {
  range,
  renderDate,
  renderTime,
} from '../../../../../../../main/src/utils';

const geninterval = (start: Date, end: Date, minutes: number) =>
  range(differenceInMinutes(end, start) / minutes).map(x =>
    addMinutes(start, x * minutes),
  );

const between = (value, min, max) => value >= min && value < max;

const isWorkingHours = date =>
  between(differenceInMinutes(date, startOfDay(date)), 10 * 60, 17 * 60 + 30);

const isSaturdayWorkinghours = date =>
  between(differenceInMinutes(date, startOfDay(date)), 10 * 60, 13 * 60 + 30);

const isLunch = date => between(getHours(date), 12, 14);

const notin = (slot, bookings) => {
  const date = renderDate(slot);
  const time = renderTime(slot);
  for (const booking of bookings) {
    if (date === booking.date && time === booking.time) {
      return false;
    }
  }
  return true;
};

const trim = (array, size) =>
  array
    .filter((d, i) => !(i % Math.floor(array.length / size)))
    .filter((d, i) => i < size);

export const genappointment1 = bookings => {
  console.log('genappointment1', bookings);
  const slots = geninterval(
    startOfHour(new Date()),
    addDays(startOfDay(new Date()), 8),
    30,
  )
    .filter(isWorkingHours)
    .filter(dt => !isSunday(dt))
    .filter(dt => !isSaturday(dt) || isSaturdayWorkinghours(dt))
    .filter(dt => !isLunch(dt))
    .filter(dt => isAfter(dt, addMinutes(new Date(), -15)))
    // .filter(dt => isAfter(dt, addMinutes(new Date(), 30)))
    .filter(dt => notin(dt, bookings))
    .map(dt => [renderDate(dt), renderTime(dt)]);

  const results = slots.reduce(
    (x, [date, time]) => ({
      ...x,
      ...{ [date]: [...(x[date] || []), time] },
    }),
    {},
  );

  return Object.fromEntries(
    Object.entries(results).map(([k, v]) => [k, trim(v, 4)]),
  );
};
