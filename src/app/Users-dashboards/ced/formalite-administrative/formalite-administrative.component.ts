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
import { Router, RouterModule } from '@angular/router';
import { FeatherModule } from 'angular-feather';
import { CedService } from 'src/app/service/ced.service';


export interface CandidatEntretienDTO {
  idEntretien: number;
  candidateName: string;
  candidatePrenom: string;
  date: string;
  resultat: string;
  status: string;
  idCandidate: number;
  rendezVousDate :string;
}


export interface candidature {
  idcandidature: number;
  etatCandidature: string;
  idCandidat: number;
  idsujet: number;
  candidatName: string;

}
@Component({
  selector: 'app-formalite-administrative',
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

  ],  templateUrl: './formalite-administrative.component.html',
  styleUrl: './formalite-administrative.component.scss'
})
export class FormaliteAdministrativeComponent {
  acceptedCandidates: CandidatEntretienDTO[] = [];
  dateRendezvous!: Date;
  selectedCandidateId!: number;
  constructor(private cedService: CedService, private http: HttpClient, private router :Router) {}


  isStrModalOpen = false;
  dateEntretien: string ='';
  currentidCandidate: number =0;


  ngOnInit(): void {
    this.loadAcceptedCandidates();

  }

  // viewDetails(candidateId: number): void {
  //   console.log("Viewing details for candidate with ID:", candidateId);
  //   this.router.navigate(['/users/ced/candidat', candidateId]);
  // }









  // loadAcceptedCandidates(): void {
  //   this.cedService.getAcceptedCandidates().subscribe(
  //     (data: CandidatEntretienDTO[]) => {
  //       this.acceptedCandidates = data;
  //       console.log(this.acceptedCandidates);
  //     },
  //     (error) => {
  //       console.error('Error fetching accepted candidates', error);
  //     }
  //   );
  // }



  loadAcceptedCandidates(): void {
    this.cedService.getAcceptedCandidates().subscribe(
      (data: CandidatEntretienDTO[]) => {
        this.acceptedCandidates = data;
        console.log(this.acceptedCandidates);

        // Fetch rendezvous for each entretien
        this.acceptedCandidates.forEach(candidate => {
          // this.fetchRendezVous(candidate.idEntretien);
        });
        console.log(this.acceptedCandidates);
      },
      (error) => {
        console.error('Error fetching accepted candidates', error);
      }
    );
  }

  fetchRendezVous(idEntretien: number): void {
    this.cedService.getRendezVousForEntretien(idEntretien).subscribe(
      (rendezVousDate: string) => {
        const candidate = this.acceptedCandidates.find(c => c.idEntretien === idEntretien);
        if (candidate) {
          candidate.rendezVousDate = rendezVousDate;
        }
      },
      (error) => {
        console.error(`Error fetching rendezvous for entretien ${idEntretien}`, error);
      }
    );
  }


  // viewDetails(idEntretien: number): void {
  //   console.log('Viewing details for candidate with interview ID:', idEntretien);
  // }
  viewDetails(candidateId: number): void {
    console.log("Viewing details for candidate with ID:", candidateId);
    this.router.navigate(['/users/ced/candidat', candidateId]);
  }


  openModal(idCandidate: number): void {
    this.currentidCandidate = idCandidate; // Store the current entretien ID
    this.isStrModalOpen = true; // Open the modal
  }

  close(): void {
    this.isStrModalOpen = false;
    this.dateEntretien = '';
  }

  onSubmit(): void {
    console.log('Submitting date:', this.dateRendezvous, 'for entretien ID:', this.currentidCandidate);
    this.cedService.addRendezVous(this.dateRendezvous ,'en-cours' ,1).subscribe(
      (response: any) => {
        console.log('Rendez-vous added successfully:', response);
        // this.refreshAcceptedCandidates();
        this.close();
      },
      ( error: any) => {
        console.error('Error adding rendez-vous:', error);
      }
    );
  }

  }




// import { CommonModule } from '@angular/common';
// import { HttpClient } from '@angular/common/http';
// import { Component } from '@angular/core';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { MatButtonModule } from '@angular/material/button';
// import { MatCardModule } from '@angular/material/card';
// import { MatRippleModule } from '@angular/material/core';
// import { MatTableModule } from '@angular/material/table';
// import { Router, RouterModule } from '@angular/router';
// import { FeatherModule } from 'angular-feather';
// import { CedService } from 'src/app/service/ced.service';

// export interface CandidatEntretienDTO {
//   idEntretien: number;
//   candidateName: string;
//   candidatePrenom: string;
//   date: string;
//   resultat: string;
//   status: string;
//   idCandidate: number;
//   rendezVousDate: string; // Field for rendez-vous date
// }

// @Component({
//   selector: 'app-formalite-administrative',
//   standalone: true,
//   imports: [
//     MatTableModule,
//     RouterModule,
//     FeatherModule,
//     FormsModule,
//     ReactiveFormsModule,
//     MatButtonModule,
//     MatCardModule,
//     MatRippleModule,
//     CommonModule
//   ],
//   templateUrl: './formalite-administrative.component.html',
//   styleUrls: ['./formalite-administrative.component.scss']
// })
// export class FormaliteAdministrativeComponent {
//   acceptedCandidates: CandidatEntretienDTO[] = [];
//   dateRendezvous!: string; // Changed type to string for date input
//   isStrModalOpen = false;
//   currentidCandidate: number = 0;

//   constructor(private cedService: CedService, private http: HttpClient, private router: Router) {}

//   ngOnInit(): void {
//     this.loadAcceptedCandidates();
//   }

//   loadAcceptedCandidates(): void {
//     this.cedService.getAcceptedCandidates().subscribe(
//       (data: CandidatEntretienDTO[]) => {
//         this.acceptedCandidates = data;

//         // Fetch rendezvous for each entretien
//         this.acceptedCandidates.forEach(candidate => {
//           this.fetchRendezVous(candidate.idEntretien);
//         });
//       },
//       (error) => {
//         console.error('Error fetching accepted candidates', error);
//       }
//     );
//   }

//   fetchRendezVous(idEntretien: number): void {
//     this.cedService.getRendezVousForEntretien(idEntretien).subscribe(
//       (rendezVousDate: string) => {
//         const candidate = this.acceptedCandidates.find(c => c.idEntretien === idEntretien);
//         if (candidate) {
//           candidate.rendezVousDate = rendezVousDate;
//         }
//       },
//       (error) => {
//         console.error(`Error fetching rendezvous for entretien ${idEntretien}`, error);
//       }
//     );
//   }

//   viewDetails(candidateId: number): void {
//     console.log("Viewing details for candidate with ID:", candidateId);
//     this.router.navigate(['/users/ced/candidat', candidateId]);
//   }

//   openModal(idCandidate: number): void {
//     this.currentidCandidate = idCandidate; // Store the current candidate ID
//     this.isStrModalOpen = true; // Open the modal
//   }

//   close(): void {
//     this.isStrModalOpen = false;
//     this.dateRendezvous = '';
//   }

//   // onSubmit(): void {
//   //   console.log('Submitting date:', this.dateRendezvous, 'for candidate ID:', this.currentidCandidate);
//   //   this.cedService.addRendezVous(this.dateRendezvous, 'en-cours', this.currentidCandidate).subscribe(
//   //     (response: any) => {
//   //       console.log('Rendez-vous added successfully:', response);
//   //       this.loadAcceptedCandidates(); // Reload accepted candidates after adding
//   //       this.close();
//   //     },
//   //     (error: any) => {
//   //       console.error('Error adding rendez-vous:', error);
//   //     }
//   //   );
//   // }

//   onSubmit(): void {
//     console.log('Submitting date:', this.dateRendezvous, 'for candidate ID:', this.currentidCandidate);

//     // Convert the string date to a Date object
//     const dateObject = new Date(this.dateRendezvous);

//     // Check if the date conversion is successful
//     if (isNaN(dateObject.getTime())) {
//       console.error('Invalid date format:', this.dateRendezvous);
//       return; // Exit if the date is invalid
//     }

//     // Call the service method with the Date object
//     this.cedService.addRendezVous(dateObject, 'en-cours', this.currentidCandidate).subscribe(
//       (response: any) => {
//         console.log('Rendez-vous added successfully:', response);
//         this.loadAcceptedCandidates(); // Reload accepted candidates after adding
//         this.close();
//       },
//       (error: any) => {
//         console.error('Error adding rendez-vous:', error);
//       }
//     );
//   }

// }
