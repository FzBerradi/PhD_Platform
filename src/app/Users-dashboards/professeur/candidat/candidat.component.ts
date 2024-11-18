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
  selector: 'app-candidat',
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
    templateUrl: './candidat.component.html',
  styleUrl: './candidat.component.scss'
})




export class CandidatComponent {
  acceptedCandidatures: boolean = false; // To keep track of accepted candidatures

  candidatures: candidature[] = [];
  idUser: number | null = null;
  selectedCandidatureId: number = 0;
  specifiedDate: Date | null = null; // Date input field
  showForm = false; // Show the form
titre : string = '';
  constructor(private http: HttpClient, private accp: AcceptedcandidatService, private auth: AuthService, private router : Router) {}

  ngOnInit() {
    this.idUser = this.auth.getUserId(); 
    console.log(this.idUser);
    if (this.idUser) {
      this.fetchAcceptedCandidate(this.idUser); // Fetch user data when the component initializes
    }
  }

  fetchAcceptedCandidate(idUser: number): void {
    this.http.get(`http://localhost:8089/phd/Professeur/candidatesaccp/${idUser}`).subscribe({
      next: (data: any) => {
        this.candidatures = data.map((item: any) => {
          const user = item[0]; // Check this part
          const sujet = item[1];
          const candidat = item[2];
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
            idCandidate: candidat.idCandidate
          };
        });
        console.log(this.candidatures);
      },
      error: (error) => {
        console.error('There was an error!', error);
      }
    });
  }



  acceptCandidature(id: number) {
    console.log('Selected Candidature ID:', id); 
    this.selectedCandidatureId = id; 
    this.accp.setIdCandidatUser(id); 
    console.log('Stored Candidature ID:', this.selectedCandidatureId); 
    this.showForm = true;
  }
  saveForm() {
    
    if (this.specifiedDate) {
      const adjustedDate = new Date(this.specifiedDate.getTime() - this.specifiedDate.getTimezoneOffset() * 60000);
      const body = {
        date: adjustedDate.toISOString().split('T')[0] // Corrected to ensure no timezone shifts
      };
        console.log('Selected Candidature ID:', this.selectedCandidatureId);

        this.http.post(`http://localhost:8089/phd/Professeur/calltoentretien/${this.idUser}/${this.selectedCandidatureId}`, 
          body, { responseType: 'text' }).subscribe({
          next: (response) => {
              alert('Candidature accepted successfully');
              this.fetchAcceptedCandidate(this.idUser!); // Refresh the candidates
              this.showForm = false; // Hide the form
          },
          error: (error) => {
              console.error('Error accepting candidature', error);
          }
        });
    } else {
        alert('Please select a date before saving.');
    }
}


  refuseCandidature(id: number, subject: string): void {
    this.selectedCandidatureId = id; // Store the selected candidature ID
    this.accp.setIdCandidatUser(id); // Update local storage for selected candidate ID

    this.http.post('http://localhost:8089/phd/Professeur/refusecandidat/2/1', {}, { responseType: 'text' })
    .subscribe(
        response => {
            alert(response); // This will log the plain text response
        },
        error => {
            console.error('Error:', error);
        }
    );

}

viewDetails(candidateId: number): void {
  console.log("Viewing details for candidate with ID:", candidateId);
  this.router.navigate(['/users/ced/candidat', candidateId]);
}
  
clearForm() {
  this.showForm = false; // Hide the form
}
}

export interface candidature {
  
  nom: string;
  prenom: string;
  email: string;
  titre: string;
  idSujet: number;
  idProfesseur: number;
  idCandidate: number;
}