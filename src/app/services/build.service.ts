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

  constructor(private httpClient: HttpClient) { }

  update(id: string,data: object) {
    return this.httpClient
    .put(`${this.baseUrl}/${id}`, data, this.httpOptions)
    .toPromise()
  }
}
