import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { XsrfInterceptor } from '../../../lib/src/xsrf/XsrfInterceptor';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CrudModule } from './crud/crud.module';
import { Bar1Component } from './dashboard/bar1/bar1.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Group1Component } from './dashboard/group1/group1.component';
import { Heat1Component } from './dashboard/heat1/heat1.component';
import { Line1Component } from './dashboard/line1/line1.component';
import { Pie1Component } from './dashboard/pie1/pie1.component';
import { Radial1Component } from './dashboard/radial1/radial1.component';
import { Stack1Component } from './dashboard/stack1/stack1.component';
import { ReportComponent } from './report/report.component';

@NgModule({
  declarations: [
    AppComponent,
    ReportComponent,
    DashboardComponent,
    Bar1Component,
    Stack1Component,
    Radial1Component,
    Pie1Component,
    Line1Component,
    Group1Component,
    Heat1Component,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CrudModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: XsrfInterceptor, multi: true },
    // AppService,
    //   ReportService,
    //   DashboardService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
