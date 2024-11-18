// src/app/planning.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PlanningPreincriptionDTO } from './planning-preinscription.dto';

@Injectable({
  providedIn: 'root'
})
export class PlanningService {
  private apiUrl = 'http://localhost:8089/phd/planning';

  constructor(private http: HttpClient) {}

  createPlanning(planning: PlanningPreincriptionDTO): Observable<any> {
    const token = localStorage.getItem('authToken'); // Retrieve JWT token
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post(`${this.apiUrl}/create`, planning, { headers });
  }

  getAllPlannings(): Observable<PlanningPreincriptionDTO[]> {
    return this.http.get<PlanningPreincriptionDTO[]>(`${this.apiUrl}/get`);
  }
}
