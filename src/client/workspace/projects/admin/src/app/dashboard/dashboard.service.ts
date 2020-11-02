import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  charts$ = this.http.get(`/admin/charts`);

  constructor(private http: HttpClient) {}
}
