import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { BrowserModule } from '@angular/platform-browser';
import { Router, RouterModule } from '@angular/router';
import { FeatherModule } from 'angular-feather';
import { AcceptedcandidatService } from 'src/app/services/acceptedcandidat.service';
import { AuthService } from 'src/app/services/auth.service';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'app-entretiens',
  standalone: true,
  imports: [
    MatTableModule,
    RouterModule,
    FeatherModule,
    MatSidenavModule,
    MatRippleModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckbox,
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,

  ],
    templateUrl: './entretiens.component.html',
  styleUrl: './entretiens.component.scss'
})


export class EntretiensComponent {
  acceptedCandidatures: boolean = false; // To keep track of accepted candidatures

  candidatures: candidature[] = [];
  idUser: number | null = null;
titre : string = '';
note : string = '';
  constructor(private http: HttpClient, private accp: AcceptedcandidatService, private auth: AuthService, private router: Router) {}

  ngOnInit() {
    this.idUser = this.auth.getUserId(); 
    console.log(this.idUser);
    if (this.idUser) {
      this.fetchAcceptedCandidate(this.idUser); // Fetch user data when the component initializes
    }
  }
  saveForm(){

  }
  fetchAcceptedCandidate(idUser: number): void {
    this.http.get(`http://localhost:8089/phd/Professeur/listentretien/${idUser}`).subscribe({
      next: (data: any) => {
        this.candidatures = data.map((item: any) => {
          const user = item[0]; // Check this part
          const sujet = item[1];
          const entretiens = item[2];
          this.accp.setIdProfesseur(sujet.idProfesseur); // Set idProfesseur
          this.accp.setIdCandidatUser(user.idUser); // Store user ID in local storage
          return {
            nom: user.nom,
            prenom: user.prenom,
            email: user.email,
            iduser: user.idUser, // Ensure this is being populated correctly
            titre: sujet.titre,
            idSujet: sujet.idSujet,
            idProfesseur: sujet.idProfesseur,
            idEntretien: entretiens.idEntretien,
            idCandidate: entretiens.idCandidate,
          };
        });
        console.log(this.candidatures);
      },
      error: (error) => {
        console.error('There was an error!', error);
      }
    });
  }

  viewDetails(candidateId: number): void {
    console.log("Viewing details for candidate with ID:", candidateId);
    this.router.navigate(['/users/ced/candidat', candidateId]);
  }
 
  submitNote(id: number) {
    const candidature = this.candidatures.find(c => c.idEntretien === id);

    if (!candidature) {
        console.error('Candidature not found for ID:', id);
        return; // Exit if candidature is not found
    }

    let body = {
        "resultat": candidature.note 
    };

    this.http.put(`http://localhost:8089/phd/Professeur/notecandidat/${id}`, body, { responseType: 'text' }).subscribe({
        next: (response) => {
            alert(response);
            this.fetchAcceptedCandidate(this.idUser!); // Refresh the candidates
        },
        error: (error) => {
            console.error('There was an error updating the note!', error);
        }
    });
}

}
export interface candidature {
  
  nom: string;
  prenom: string;
  email: string;
  titre: string;
  idSujet: number;
  idProfesseur: number;
  idEntretien: number;
  note?: number;  
  idCandidate: number;
}