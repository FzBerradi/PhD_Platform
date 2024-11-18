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
import { RouterModule } from '@angular/router';
import { FeatherModule } from 'angular-feather';
import { AcceptedcandidatService } from 'src/app/services/acceptedcandidat.service';
import { AuthService } from 'src/app/services/auth.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
@Component({
  selector: 'app-mes-doctorants',
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

  ],  templateUrl: './mes-doctorants.component.html',
  styleUrl: './mes-doctorants.component.scss'
})
export class MesDoctorantsComponent {
  acceptedCandidatures: boolean = false; // To keep track of accepted candidatures

  candidatures: candidature[] = [];
  idUser: number | null = null;
titre : string = '';
note : string = '';
  constructor(private http: HttpClient, private accp: AcceptedcandidatService, private auth: AuthService) {}

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
    this.http.get(`http://localhost:8089/phd/Professeur/doctorant/${idUser}`).subscribe({
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
          };
        });
        console.log(this.candidatures);
      },
      error: (error) => {
        console.error('There was an error!', error);
      }
    });
  }

  viewDetails(idCandidat: number): void {
    console.log('View details for candidate ID:', idCandidat);
  }

  download(professorId: Number, identretien: Number) {
    this.http.get(`http://localhost:8089/phd/Professeur/generate-pdf?professorId=${professorId}&identretien=${identretien}`, {
        responseType: 'blob' // Set responseType to blob
    }).subscribe({
        next: (blob: Blob) => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'doctorant_info.pdf'; // Specify the filename
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        },
        error: (error) => {
            console.error('There was an error!', error);
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
  
}

