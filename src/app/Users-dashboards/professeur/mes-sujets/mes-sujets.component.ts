import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { FeatherModule } from 'angular-feather';
import { AcceptedcandidatService } from 'src/app/services/acceptedcandidat.service';
import { AuthService } from 'src/app/services/auth.service';
import { MatIconModule } from '@angular/material/icon';
import { R } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-mes-sujets',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatCheckbox,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSidenavModule,
    MatTableModule,
    RouterModule,
    FeatherModule,
    MatIconModule
  ],
  templateUrl: './mes-sujets.component.html',
  styleUrls: ['./mes-sujets.component.scss'] // Corrected to styleUrls
})
export class MesSujetsComponent {
  MesSujets: MesSujets[] = [];
  idUser: number | null = null;
  isEditMode = false; 
  isAdding = false; 
  selectedSujet: any = {}; // Holds data of selected sujet
  constructor(
    private http: HttpClient,
    private accp: AcceptedcandidatService,
    private auth: AuthService
  ) {
    
  }
  addSujet(){
    this.isAdding =true;
  }
  ngOnInit() {
    this.idUser = this.auth.getUserId();
    console.log(this.idUser);
    if (this.idUser) {
      this.fetchAcceptedCandidate(this.idUser);
    }
  }
  saveSujet(idSujet: number) {
    const body = {
      titre: this.selectedSujet.titre,
      description: this.selectedSujet.description,
      projet: this.selectedSujet.projet
    };
  
    this.http.put(`http://localhost:8089/phd/sujet/updateSujet/${idSujet}`, body, { responseType: 'text' }).subscribe({
      next: (response) => {
        alert(response);
        this.fetchAcceptedCandidate(this.idUser!);
       this.isEditMode = false;
      }
    });
  }
  
  clearForm() {
    this.isEditMode = false;
    this.selectedSujet = {};
    this.isAdding = false;
  }

  fetchAcceptedCandidate(idUser: number): void {
    this.http.get(`http://localhost:8089/phd/sujet/getSujet/${idUser}`).subscribe({
      next: (data: any) => {
        this.MesSujets = data.map((item: any) => {
          return {
            titre: item.titre,
            description: item.description,
            projet: item.projet,
            idSujet: item.idSujet,
            idProfesseur: item.idProfesseur
          };
        });
        console.log(this.MesSujets);
      },
      error: (error) => {
        console.error('There was an error!', error);
      }
    });
  }
  editSujet(idSujet: number): void {
    this.isEditMode = true; 
    this.selectedSujet = this.MesSujets.find(sujet => sujet.idSujet === idSujet);
  }

  viewDetails(idCandid: number): void {
    console.log('View details for candidate ID:', idCandid);
  }
  

  
    deleteMesSujets(idSujet: number): void {
      this.http.delete(`http://localhost:8089/phd/sujet/deleteSujet/${idSujet}`, { responseType: 'text' }).subscribe(
        (response) => {
            alert(response)
            this.fetchAcceptedCandidate(this.idUser!);
        },
        (error) => {
            // Handle the error case
            alert('this sujet has relation with other table impossible to delete it '); // Display the error message returned from the server
        }
    );
    
    
    }
    addNewSujet(){
      let body ={
        titre: this.selectedSujet.titre,
        description: this.selectedSujet.description,
        projet: this.selectedSujet.projet
      }
      this.http.post(`http://localhost:8089/phd/sujet/addsujet/${this.idUser}`, body, { responseType: 'text' }).subscribe({
        next: (response) => {
          alert(response);
          this.fetchAcceptedCandidate(this.idUser!);
          this.isAdding = false;
        }
      });
    }

    
  }
  



export interface MesSujets {
  titre: string;
  description: string;
  projet: string;
  idSujet: number;
  idProfesseur: number;
}
