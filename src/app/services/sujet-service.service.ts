import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Sujet {
  idSujet: number;
  titre: string;
  projet: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class SujetService {
  private baseUrl = 'http://localhost:8080/phd/auth/users/candidate/get-all-sujets';

  constructor(private http: HttpClient) {}

  getSujets(): Observable<Sujet[]> {
    return this.http.get<Sujet[]>(this.baseUrl);
  }
}
