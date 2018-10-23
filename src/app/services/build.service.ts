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

  create(data: object) {
    return this.httpClient
      .post(this.baseUrl, data, this.httpOptions)
      .toPromise();
  }

  update(id: string, data: object) {
    return this.httpClient
      .put(`${this.baseUrl}/${id}`, data, this.httpOptions)
      .toPromise();
  }

  poll(id: string) {
    return this.httpClient
      .get(`${this.baseUrl}/poll/${id}`, this.httpOptions)
      .toPromise();
  }

  get(id: string) {
    return this.httpClient
      .get(`${this.baseUrl}/${id}`, this.httpOptions)
      .toPromise();
  }
}
