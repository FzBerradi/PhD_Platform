import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CandidatDTO } from './candidat.dto';

@Injectable({
  providedIn: 'root',
})
export class CandidatService {
  private apiUrl = 'http://localhost:8089/phd/auth/users/candidat';

  constructor(private http: HttpClient) {}

  createCandidat(candidatDTO: CandidatDTO, userId: number): Observable<CandidatDTO> {
    return this.http.post<CandidatDTO>(`${this.apiUrl}/create/${userId}`, candidatDTO);
  }

  getAllCandidats(): Observable<CandidatDTO[]> {
    return this.http.get<CandidatDTO[]>(`${this.apiUrl}/getAll`);
  }

  getCandidatById(id: number): Observable<CandidatDTO> {
    return this.http.get<CandidatDTO>(`${this.apiUrl}/${id}`);
  }
}
