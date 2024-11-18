import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CedService } from 'src/app/service/ced.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { Router, RouterModule } from '@angular/router';
import { FeatherModule } from 'angular-feather';
import { AuthService } from 'src/app/services/auth.service';
import { AcceptedcandidatService } from 'src/app/services/acceptedcandidat.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-suivi-candidature',
  standalone: true,
  imports: [CommonModule,
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
    MatButtonModule
  ],
  templateUrl: './suivi-candidature.component.html',
  styleUrl: './suivi-candidature.component.scss'
})
export class SuiviCandidatureComponent {
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
