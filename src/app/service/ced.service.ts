import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Etablissement } from '../Users-dashboards/ced/structure-de-recherche/structure-de-recherche.component';

interface Sujet {
  idSujet: number;
  titre: string;
  projet: string;
  description: string;
}
@Injectable({
  providedIn: 'root'
})
export class CedService {


  private apiUrl = 'http://localhost:8089/phd/auth/users/ced';

  constructor(private http : HttpClient){}

  //get the ceds
  getAllCed():Observable<any[]>{
    // return this.http.get<any[]>(this.apiUrl, { responseType: 'json' });
    return this.http.get<any[]>(`${this.apiUrl}/get-all-ced`,  { responseType: 'json' });
  }

  //get the etablissememnt by ced
  getAllEtablissemnt():Observable<any[]>{
    return this.http.get<any[]>(`${this.apiUrl}/get-all-etablissement`,  { responseType: 'json' });
  }
  getAllEtablissemntByCEd(selectedCedId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/get-ced-etablissement/${selectedCedId}`);
  }




//add elements


  getAllEtablissements(idCED: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/get-ced-etablissement/${idCED}`);
  }

  getStructuresByEtablissement(idEtablissement: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/get-etablissememnt-str/${idEtablissement}`);
  }

  getProfesseursByStructure(idStr: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/get-str-prof/${idStr}`);
  }



  private apiUrlGeneral = 'http://localhost:8089/phd/auth/users';

  addEtablissement(CedId: number, etablissement: any): Observable<string> {
      return this.http.post(`${this.apiUrlGeneral}/etablissements/create/${CedId}`, etablissement, { responseType: 'text' });
  }

  addStructureRecherche(etablissementId: number, structureRecherche: any): Observable<string> {
    return this.http.post(`${this.apiUrlGeneral}/structures-recherche/create/${etablissementId}`, structureRecherche, { responseType: 'text' });
  }

// addStructure(etablissementId: number, structure: any): Observable<string> {
//   return this.http.post<string>(`${this.apiUrlGeneral}/structures-recherche/create/${etablissementId}`, structure, { responseType: 'text' as 'json' });
// }

//   addProfesseur(CedId: number, professeur: any): Observable<string> {
//     return this.http.post<any>(`${this.apiUrlGeneral}/professeurs/create/${CedId}`, professeur , { responseType: 'text' });
// }

    addProfesseur(CedId: number, professeur: any): Observable<string> {
      console.log("ced ", professeur )
      return this.http.post(`${this.apiUrlGeneral}/professeurs/create/${CedId}`, professeur, { responseType: 'text' });
    }

    getAllProfessors(): Observable<any[]> {
      return this.http.get<any[]>(`${this.apiUrlGeneral}/professeurs`);
    }

    // getSubjectsByProfessorId(professorId: number): Observable<any[]> {
    //   return this.http.get<any[]>(`${this.apiUrlGeneral}/professeurs/${professorId}/sujets`);
    // }

    getSubjectsByProfessorId(professorId: number): Observable<Sujet[]> {
      const url = `${this.apiUrlGeneral}/professeurs/${professorId}/sujets`;
      return this.http.get<Sujet[]>(url).pipe(
          catchError((error) => {
              console.error('Error fetching subjects:', error);
              return throwError(error);
          })
      );
  }


  getAllEtablissementsWithStructures(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrlGeneral}/etablissements/all`);
  }










    //get the candidature profil = preinscription
    getAllCandidature():Observable<any[]>{
      return this.http.get<any[]>(`${this.apiUrl}/get-all-candidature`,  { responseType: 'json' });
    }

    updateCandidatureStatus(id: number, status: string): Observable<any> {
      return this.http.put<any>(`${this.apiUrl}/update-candidature-status/${id}/${status}`, { status });
    }

    getCandidatById(id: number): Observable<any> {
      return this.http.get<any>(`http://localhost:8089/phd/auth/users/candidat/${id}`,  { responseType: 'json' });
    }

    getFile(filename: string): Observable<Blob> {
      return this.http.get(`${this.apiUrl}/file/${filename}`, { responseType: 'blob' });
  }



//formlite admin
  getAcceptedCandidates(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/getCandidates`, { responseType: 'json' });
  }

  // addRendezVous(dateRendezvous: Date, etatRendezVous: string, idCandidate: number): Observable<any> {
  //   const body = { dateRendezvous, etatRendezVous, idCandidate };
  //   return this.http.post(`${this.apiUrl}/add`, body  , { responseType: 'json' });
  // }

//   addRendezVous(dateRendezvous: Date, etatRendezVous: string, idCandidate: number): Observable<any> {
//     const body = {
//         dateRendezvous: dateRendezvous.toISOString().split('T')[0],
//         etatRendezVous,
//         idCandidate
//     };
//     return this.http.post(`${this.apiUrl}/add`, body, { responseType: 'json' });
// }

addRendezVous(dateRendezvous: Date, etatRendezVous: string, idCandidate: number): Observable<any> {
  const body = {
      dateRendezvous, // Send the Date object directly
      etatRendezVous,
      idCandidate
  };
  console.log(dateRendezvous)
  return this.http.post(`${this.apiUrl}/add`, body, { responseType: 'text' });
}



  getRendezVousByCandidatId(idCandidat: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/rendezvous/candidat/${idCandidat}`);
  }

  // getRendezVousForEntretien(idEntretien: number): Observable<string> {
  //   return this.http.get<string>(`/rendezvous/${idEntretien}`);
  // }


  getRendezVousForEntretien(idEntretien: number): Observable<string> {
    return this.http.get<string>(`${this.apiUrl}/candidats/${idEntretien}/rendezvous`);
  }



  //bourse
  // getBourses(): Observable<any[]> {
  //   return this.http.get<any[]>(`http://localhost:8089/phd/auth/users/bourse/en-cours`);
  // }
  getAllBourses(): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:8089/phd/auth/users/bourse/all`);
  }
  changeBourseStatus(id: number, status: string): Observable<void> {
    return this.http.put<void>(`http://localhost:8089/phd/auth/users/bourse/change-status/${id}?status=${status}`, {});
  }

  
  getCandidatureByCandidateId(idCandidate: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/candidature/by-candidate/${idCandidate}`);
  }
  getSujetById(sujetId: number): Observable<Sujet> {
    return this.http.get<Sujet>(`${this.apiUrl}/sujet/${sujetId}`).pipe(
        catchError((error) => {
            console.error('Error fetching sujet:', error);
            return throwError(() => new Error('Error fetching sujet, please try again later.'));
        })
    );
}

}
