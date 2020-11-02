import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BoolPipe } from './bool.pipe';
import { CurrencyPipe } from './currency.pipe';
import { DatePipe } from './date.pipe';
import { DatetimePipe } from './datetime.pipe';
import { HumandatePipe } from './humandate.pipe';
import { HumantimePipe } from './humantime.pipe';
import { TimePipe } from './time.pipe';

@NgModule({
  declarations: [
    BoolPipe,
    DatePipe,
    TimePipe,
    DatetimePipe,
    HumantimePipe,
    HumandatePipe,
    CurrencyPipe,
  ],
  imports: [CommonModule],
  exports: [
    BoolPipe,
    DatePipe,
    TimePipe,
    DatetimePipe,
    HumantimePipe,
    HumandatePipe,
    CurrencyPipe,
  ],
})
export class PipeModule {}
