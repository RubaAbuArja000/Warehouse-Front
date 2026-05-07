import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class LogsApiService {
  private http = inject(HttpClient);
  private url  = `${environment.apiUrl}/logs`;

  getFiles(): Observable<string[]> {
    return this.http.get<string[]>(this.url);
  }

  getContent(fileName: string): Observable<string> {
    return this.http.get(`${this.url}/${fileName}`, { responseType: 'text' });
  }
}
