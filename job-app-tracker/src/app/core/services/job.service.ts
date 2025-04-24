import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JobApplication } from '../models/job-application.model';

@Injectable({ providedIn: 'root' })
export class JobService {
  private apiUrl = 'https://localhost:7201/api/applications';

  constructor(private http: HttpClient) {}

  getAll(): Observable<JobApplication[]> {
    return this.http.get<JobApplication[]>(this.apiUrl);
  }

  create(application: JobApplication): Observable<JobApplication> {
    return this.http.post<JobApplication>(this.apiUrl, application);
  }


    updateStatusAndDate(id: number, status: string, dateApplied: string): Observable<void> {
      return this.http.patch<void>(`${this.apiUrl}/${id}/status`, {
      status,
      dateApplied
    });
    }


}
