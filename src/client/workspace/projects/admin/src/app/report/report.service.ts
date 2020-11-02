import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  constructor(private http: HttpClient) {}

  async report(form): Promise<any> {
    return (await this.http
      .post(`/api/report/`, form, { responseType: 'blob' })
      .toPromise()) as any;
  }
}
