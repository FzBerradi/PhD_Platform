import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { BrowserModule } from '@angular/platform-browser';
import { Router, RouterModule } from '@angular/router';
import { FeatherModule } from 'angular-feather';
import { CedService } from 'src/app/service/ced.service';

export interface PeriodicElement {
  id: number;
  name: string;
  work: string;
  project: string;
  priority: string;
  badge: string;
  budget: string;
}

export interface candidature {
  idcandidature: number;
  etatCandidature: string;
  idCandidat: number;
  idsujet: number;
  candidatName: string;
  candidatPrenom: string;

}



export interface Candidat {
  idCandidate: number;
  dateNaissance: Date;
  adresse: string;
  cin: string;
  cne: string;
  pays: string;
  photo: string;
  diplomeObtenu: string;
  etablissementPrecedent: string;
  fonctionnaire: boolean;
  // user: User;
}



@Component({
  selector: 'app-preinscription',
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
    MatButtonModule

  ],
  templateUrl: './preinscription.component.html',
  styleUrl: './preinscription.component.scss'
})

export class PreinscriptionComponent {
  candidatures: candidature[] = [];

  // displayedColumns: string[] = ['id', 'name', 'status', 'actions'];

  displayedColumns: string[] = ['id', 'etat', 'idCAndidat', 'idSujet', 'name', 'viewCandidat'];


  // dataSource :candidature[] = [
  //   {
  //     idcandidature: 1,
  //     etatCandidature: 'Accepted',
  //     idCandidat: 101,
  //     idsujet: 201,
  //     candidatName: 'Alice Johnson'
  //   },
  //   {
  //     idcandidature: 2,
  //     etatCandidature: 'Pending',
  //     idCandidat: 102,
  //     idsujet: 202,
  //     candidatName: 'Bob Smith'
  //   },
  //   {
  //     idcandidature: 3,
  //     etatCandidature: 'Rejected',
  //     idCandidat: 103,
  //     idsujet: 203,
  //     candidatName: 'Charlie Brown'
  //   },
  //   {
  //     idcandidature: 4,
  //     etatCandidature: 'Accepted',
  //     idCandidat: 104,
  //     idsujet: 204,
  //     candidatName: 'Diana Prince'
  //   },
  //   {
  //     idcandidature: 5,
  //     etatCandidature: 'Pending',
  //     idCandidat: 105,
  //     idsujet: 205,
  //     candidatName: 'Ethan Hunt'
  //   }
  // ];



  constructor(private cedService: CedService, private http: HttpClient, private router :Router) {}

  ngOnInit(): void {
    this.fetchAllCandidature();
    // this.candidatures = [
    //   { idcandidature: 1, etatCandidature: 'Accepted', idCandidat: 101, idsujet: 201, candidatName: 'Alice Johnson', candidatPrenom: 'Alice' },
    //   { idcandidature: 2, etatCandidature: '', idCandidat: 102, idsujet: 202, candidatName: 'Bob Smith' , candidatPrenom: 'Bob'},
    //   { idcandidature: 3, etatCandidature: 'Rejected', idCandidat: 103, idsujet: 203, candidatName: 'Charlie Brown' , candidatPrenom: 'Charlie'},
    //   { idcandidature: 4, etatCandidature: 'Accepted', idCandidat: 104, idsujet: 204, candidatName: 'Diana Prince' , candidatPrenom: 'Diana'},
    //   { idcandidature: 5, etatCandidature: '', idCandidat: 105, idsujet: 205, candidatName: 'Ethan Hunt' , candidatPrenom: 'Ethan'}
    // ];
  }


  fetchAllCandidature(): void {
    this.cedService.getAllCandidature().subscribe(
      (candidatures: any[]) => {
        this.candidatures = candidatures;
        console.log(this.candidatures);
        this.fetchCandidatesForCandidatures();
      },
      (error) => {
        console.error('Error fetching candidatures:', error);
      }
    );
  }

  candidatInfo : any = [];
  fetchCandidatdata(id : number): void {
    this.cedService.getCandidatById(id).subscribe(
      (candidatInfo: any[]) => {
        this.candidatInfo = candidatInfo;
        console.log(this.candidatInfo);
      },
      (error) => {
        console.error('Error fetching candidatures:', error);
      }
    );
  }

  // fetchCandidatesForCandidatures(): void {
  //   this.candidatures.forEach((candidature) => {
  //     this.cedService.getCandidatById(candidature.idCandidat).subscribe(
  //       (candidat: any) => {
  //         console.log("Candidat fetched:", candidat);
  //         // candidature.candidatName = candidat.name;
  //         // console.log("id", candidature.idCandidat);
  //         // console.log("nom", candidature.candidatName);
  //       },
  //       (error) => {
  //         console.error(`Error fetching candidat with ID ${candidature.idCandidat}:`, error);
  //       }
  //     );
  //   });
  // }


  fetchCandidatesForCandidatures(): void {
    this.candidatures.forEach((candidature) => {
      this.cedService.getCandidatById(candidature.idCandidat).subscribe(
        (candidat: any) => {
          console.log("Candidat fetched:", candidat);

          candidature.candidatName = candidat.nom; // Update with actual property from API
          candidature.candidatPrenom = candidat.prenom; // Update with actual property from API

          console.log("Updated candidature:", candidature);
        },
        (error) => {
          console.error(`Error fetching candidat with ID ${candidature.idCandidat}:`, error);
        }
      );
    });
  }


  viewDetails(candidateId: number): void {
    console.log("Viewing details for candidate with ID:", candidateId);
    this.router.navigate(['/users/ced/candidat', candidateId]);
  }





  acceptCandidature(id: number): void {
    this.cedService.updateCandidatureStatus(id, 'accepted').subscribe(
      (response) => {
        this.fetchAllCandidature();
        this.fetchCandidatesForCandidatures();
      },
      (error) => {
        console.error('Error accepting candidature:', error);
      }
    );
    setTimeout(() => {
      window.location.reload();
  }, 100);
  }

  refuseCandidature(id: number): void {
    this.cedService.updateCandidatureStatus(id, 'refused').subscribe(
      (response) => {
        this.fetchAllCandidature();
        this.fetchCandidatesForCandidatures();
        
      },
      (error) => {
        console.error('Error refusing candidature:', error);
      }
    );
    setTimeout(() => {
      window.location.reload();
  }, 100);
  }

}
