import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AcceptedcandidatService {

  constructor() { }
  private storageKeyIdProfesseur = 'idProfesseur';
  private storageKeyIdCandidat = 'idCandidat';


  setIdProfesseur(id: number): void {
    localStorage.setItem(this.storageKeyIdProfesseur, id.toString());
  }

  getIdProfesseur(): number | null {
    const id = localStorage.getItem(this.storageKeyIdProfesseur);
    return id ? Number(id) : null;
  }

  // Method to set idCandidat in local storage
  setIdCandidatUser(id: number): void {
    localStorage.setItem(this.storageKeyIdCandidat, id.toString());
  }

  // Method to get idCandidat from local storage
  getIdCandidatUser(): number | null {
    const id = localStorage.getItem(this.storageKeyIdCandidat);
    return id ? Number(id) : null;
  }
}

