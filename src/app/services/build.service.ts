import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BuildService {
  private baseUrl = `${environment.server}/builds`;
  private httpOptions = {
    withCredentials: true,
    headers: null
  };

  constructor(private httpClient: HttpClient) {}

  create(data: object):Promise<Object> {
    return this.httpClient
      .post(this.baseUrl, data, this.httpOptions)
      .toPromise();
  }

  update(id: string, data: object):Promise<Object> {
    return this.httpClient
      .put(`${this.baseUrl}/${id}`, data, this.httpOptions)
      .toPromise();
  }

  poll(id: string):Promise<Object> {
    return this.httpClient
      .get(`${this.baseUrl}/poll/${id}`, this.httpOptions)
      .toPromise();
  }

  get(id: string):Promise<Object> {
    return this.httpClient
      .get(`${this.baseUrl}/${id}`, this.httpOptions)
      .toPromise();
  }

  submitEmail(id: string, userEmail: string):Promise<Object> {
    return this.httpClient
      .post(`${this.baseUrl}/email/${id}`, { userEmail }, this.httpOptions)
      .toPromise();
  }
}
