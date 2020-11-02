import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { XsrfInterceptor } from './XsrfInterceptor';

@NgModule({
  declarations: [XsrfInterceptor],
  imports: [CommonModule],
  // providers: [
  //   { provide: HTTP_INTERCEPTORS, useClass: XsrfInterceptor, multi: true },
  // ],
})
export class XsrfModule {}
