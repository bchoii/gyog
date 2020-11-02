import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  self$ = this.http.get(`/api/self/`);

  get cart() {
    try {
      console.log(localStorage.getItem('cart'));
      return JSON.parse(localStorage.getItem('cart'));
    } catch (error) {}
    return [];
  }

  set cart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  constructor(private http: HttpClient) {}

  async getById(model, id): Promise<any> {
    return await this.http.get(`/api/crud/${model}/${id}/`).toPromise();
  }

  async getAll(model, page = 0): Promise<any> {
    return await this.http.get(`/api/crud/${model}/?page=${page}`).toPromise();
  }

  async create(model, record): Promise<any> {
    return await this.http.post(`/api/crud/${model}/`, record).toPromise();
  }
}
