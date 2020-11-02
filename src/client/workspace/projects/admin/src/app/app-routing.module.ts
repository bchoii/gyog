import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReportComponent } from './report/report.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./crud/crud.module').then((m) => m.CrudModule),
  },
  { path: 'report', component: ReportComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
