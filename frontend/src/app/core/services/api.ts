import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class Api {
  private http = inject(HttpClient);
  private baseUrl = environment.baseUrl;

  get<T>(endpoint: string, params?: any) {
    return this.http.get<T>(`${this.baseUrl}/${endpoint}`, { params });
  }

  post<T>(endpoint: string, data: any) {
    return this.http.post<T>(`${this.baseUrl}/${endpoint}`, data);
  }

  put<T>(endpoint: string, data: any) {
    return this.http.put<T>(`${this.baseUrl}/${endpoint}`, data);
  }

  patch<T>(endpoint: string, data: any) {
    return this.http.patch<T>(`${this.baseUrl}/${endpoint}`, data);
  }

  delete<T>(endpoint: string) {
    return this.http.delete<T>(`${this.baseUrl}/${endpoint}`);
  }
}
