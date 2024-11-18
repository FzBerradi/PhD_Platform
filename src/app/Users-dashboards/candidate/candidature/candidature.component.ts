import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule
import { MatInputModule } from '@angular/material/input'; // Import MatInputModule
import { MatFormFieldModule } from '@angular/material/form-field'; // Import MatFormFieldModule
import { MatSelectModule } from '@angular/material/select'; // Import MatSelectModule
import { MatButtonModule } from '@angular/material/button'; // Import MatButtonModule
import { MatDatepickerModule } from '@angular/material/datepicker'; // Import MatDatepickerModule
import { MatNativeDateModule } from '@angular/material/core'; // Import MatNativeDateModule
import { MatCardModule } from '@angular/material/card'; // Import MatCardModule
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CedService } from 'src/app/service/ced.service';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-demande-bourse',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule ,
    CommonModule, FontAwesomeModule, FormsModule
  ],
  templateUrl: './candidature.component.html',
  styleUrl: './candidature.component.scss'
})
export class CandidatureComponent implements OnInit {

  candidateForm: FormGroup;
  photoUrl: string | undefined;
  candidat :any;
  constructor(private fb: FormBuilder, private cedService: CedService ,private http : HttpClient) {
    this.candidateForm = this.fb.group({
      dateNaissance: ['',],
      cin: ['',],
      cne: ['',],
      adresse: ['',],
      pays: ['',],
      situationFamiliale: [''],
      nationalite: [''],
      paysNaissance: [''],
      provinceNaissance: [''],
      lieuNaissance: [''],
      sexe: [''],
      codePostal: [''],
      emailInstitutionnel: [''],
      handicape: [false],
      nomLycee: [''],
      paysBac: [''],
      provinceBac: [''],
      filiereBac: [''],
      anneeObtentionBac: [null],
      mentionBac: [''],
      moyenneBac: [null],
      nomUniversiteLicence: [''],
      paysLicence: [''],
      anneeObtentionLicence: [null],
      mentionLicence: [''],
      moyenneLicence: [null],
      nomUniversiteMaster: [''],
      paysMaster: [''],
      statutMaster: [''],
      specialiteMaster: [''],
      anneeObtentionMaster: [null],
      mentionMaster: [''],
      moyenneMaster: [null],
      photo: [null,],
      baccalaureatScanne: [null],
      licenceScanne: [null],
      masterScanne: [null],
      releveNoteMasterScanne: [null],
      releveNoteLicenceScanne: [null],
      // experienceProfessionnelle: [false],

      fonctionnaire: [''],
      professionPere: [''],
      professionMere: [''],
      candidatProfession: [''],
      organismeEmployeur: [''],
      specialiteLicence: [''],
      experienceProfessionnelle: [''],
      fonction: [''],
      secteur: [''],
      dateDebut: [''],
      dateFin: ['']
    });
  }


  ngOnInit(): void {}




  // onSubmit(): void {
  //   if (this.candidateForm.valid) {
  //     const formData = new FormData();
  //     for (const key in this.candidateForm.controls) {
  //       formData.append(key, this.candidateForm.controls[key].value);
  //     }

  //     const idUser = 1;
  //     this.cedService.submitCandidate(formData,idUser).subscribe(response => {
  //       console.log('Response from server:', response);
  //     }, error => {
  //       console.error('Error submitting form:', error);
  //     });
  //   } else {
  //     console.log('Form is invalid:', this.candidateForm.errors);
  //   }
  // }

//   onSubmit(): void {
//     if (this.candidateForm.valid) {
//       const userId = 3; // Replace this with the actual user ID logic
//       const formData = this.candidateForm.value;
//  console.log(this.candidateForm.value)
//       this.http.post(http://localhost:8089/phd/auth/users/candidat/create/${userId}, formData)
//         .subscribe(
//           response => {
//             console.log('Candidat créé avec succès:', response);
//             alert('Candidat créé avec succès');
//           },
//           error => {
//             console.error('Erreur lors de la création du candidat:', error);
//             alert('Erreur lors de la création du candidat');
//           }
//         );
//     } else {
//       alert('Veuillez remplir tous les champs requis.');
//     }
//   }


onSubmit(): void {
  if (this.candidateForm.valid) {
    const userId = 3; // Replace this with the actual user ID logic
    const formData: FormData = new FormData();

    // Append form controls to FormData
    Object.keys(this.candidateForm.controls).forEach((key) => {
      const value = this.candidateForm.controls[key].value;
      if (value instanceof File) {
        formData.append(key, value, value.name);
      } else {
        formData.append(key, value);
      }
    });

    this.http.post(`http://localhost:8089/phd/auth/users/candidat/create/${userId}`, formData)
    .subscribe(
      response => {
        console.log('Candidat créé avec succès:', response);
        alert('Candidat créé avec succès');
      },
      error => {
        console.error('Erreur lors de la création du candidat:', error);
        alert('Erreur lors de la création du candidat');
      }
    );
} else {
  alert('Veuillez remplir tous les champs requis.');
}
}


  onFileChange(event: any, field: string): void {
    const file = event.target.files[0];
    if (file) {
      this.candidateForm.patchValue({ [field]: file });
    }
  }

// onFileSelected(event: Event): void {
//   const inputElement = event.target as HTMLInputElement;

//   if (inputElement.files && inputElement.files.length > 0) {
//     const selectedFile = inputElement.files[0];
//     console.log('File name:', selectedFile.name);
//     console.log('File size (in bytes):', selectedFile.size);
//     console.log('File type:', selectedFile.type);
//   } else {
//     console.log('No file selected');
//   }
// }


uploadFile(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    // Make sure to implement your file upload logic here, for example:
    // this.yourService.uploadFile(formData).subscribe(response => {
    //     // Handle response, set photoUrl from response if needed
    //     this.form.patchValue({ photoUrl: response.fileUrl });
    // });
}
}


