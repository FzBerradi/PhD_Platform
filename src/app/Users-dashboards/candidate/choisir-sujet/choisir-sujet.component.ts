import { Sujet, SujetService } from 'src/app/services/sujet-service.service';
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
  selector: 'app-choisir-sujet',
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
  ],  templateUrl: './choisir-sujet.component.html',
  styleUrl: './choisir-sujet.component.scss'
})

  export class ChoisirSujetComponent {
    MesSujets: MesSujets[] = [];
    idUser: number | null = null;
    ischossed = false;
    selectedSujet: MesSujets | null = null; // Now holds the selected `MesSujets`
  
    constructor(
      private http: HttpClient,
      private accp: AcceptedcandidatService,
      private auth: AuthService
    ) {}
  
    ngOnInit() {
      this.idUser = this.auth.getUserId();
      this.fetchAcceptedCandidate();
    }
    selectAndAddSujet(sujet: MesSujets) {
      this.selectedSujet = sujet;
      this.addsujet(sujet.idSujet);
    }
    
    
    addsujet(idSujet: number) {
      if (idSujet && this.idUser !== null) {
        this.http.post(`http://localhost:8089/phd/candidature/add/${this.idUser}/${idSujet}`, {}, { responseType: 'text' })
          .subscribe({
            next: (data: string) => {
              alert(data); 
              this.fetchAcceptedCandidate();
              this.ischossed = true;
            },
            error: (error) => {
              // Here you can handle errors specifically
              if (error.status === 400) {
                alert(error.error);
              } else {
                console.error('le max est 3!', error); 
              }
            }
          });
      } else {
        console.error('No subject selected or user ID is null');
      }
    }
    
  
    fetchAcceptedCandidate(): void {
      this.http.get(`http://localhost:8089/phd/candidature/get-all-sujets`).subscribe({
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

  }
  

    

    
  
  



export interface MesSujets {
  idSujet: number,
  titre: string,
  idProfesseur: number,
  projet: string,
  description: string

}
