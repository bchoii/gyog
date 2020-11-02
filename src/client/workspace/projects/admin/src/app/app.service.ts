import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  version$ = this.http.get(`/api/version/`).pipe(map((v: any) => v.version));
  self$ = this.http.get(`/api/self/`);

  constructor(private http: HttpClient) {}

  async getAll(model, page = 0): Promise<any> {
    return await this.http.get(`/api/crud/${model}/?page=${page}`).toPromise();
  }

  async getBySearch2(model, search): Promise<any> {
    return await this.http
      .get(`/api/crud/${model}/?s=${JSON.stringify(search)}`)
      .toPromise();
  }

  async getBySearch3(model, search): Promise<any> {
    return (await this.getBySearch2(model, search)).data;
  }

  async getById(model, id): Promise<any> {
    return await this.http.get(`/api/crud/${model}/${id}/`).toPromise();
  }

  async create(model, record): Promise<any> {
    return await this.http.post(`/api/crud/${model}/`, record).toPromise();
  }

  async save(model, record): Promise<any> {
    return await this.http
      .patch(`/api/crud/${model}/${record.id}/`, record)
      .toPromise();
  }

  async remove(model, id): Promise<any> {
    return await this.http.delete(`/api/crud/${model}/${id}/`).toPromise();
  }

  async send(target, message): Promise<any> {
    return await this.http
      .post(`/api/whatsapp/${target}/`, { message })
      .toPromise();
  }

  async sendbethesda(itemid, action): Promise<any> {
    return await this.http
      .post(`/bethesda/sms/`, { itemid, action })
      .toPromise();
  }
}
