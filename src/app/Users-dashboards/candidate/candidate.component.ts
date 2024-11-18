import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule
import { MatInputModule } from '@angular/material/input'; // Import MatInputModule
import { MatFormFieldModule } from '@angular/material/form-field'; // Import MatFormFieldModule
import { MatSelectModule } from '@angular/material/select'; // Import MatSelectModule
import { MatButtonModule } from '@angular/material/button'; // Import MatButtonModule
import { MatDatepickerModule } from '@angular/material/datepicker'; // Import MatDatepickerModule
import { MatNativeDateModule } from '@angular/material/core'; // Import MatNativeDateModule
import { MatCardModule } from '@angular/material/card'; // Import MatCardModule

@Component({
  selector: 'app-candidate',
  standalone: true,
  imports: [
    ReactiveFormsModule, 
    MatInputModule, 
    MatFormFieldModule, 
    MatSelectModule, 
    MatButtonModule, 
    MatDatepickerModule,
    MatNativeDateModule, 
    MatCardModule // Include MatCardModule
  ],
  templateUrl: './candidate.component.html',
  styleUrls: ['./candidate.component.scss'] // Corrected styleUrls
})
export class CandidateComponent implements OnInit {
  candidateForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.candidateForm = this.fb.group({
      dateNaissance: ['', Validators.required],
      adresse: ['', Validators.required],
      cin: ['', Validators.required],
      cne: ['', Validators.required],
      pays: ['', Validators.required],
      photo: ['', Validators.required],
      situationFamiliale: [''],
      nationalite: [''],
      paysNaissance: [''],
      provinceNaissance: [''],
      lieuNaissance: [''],
      sexe: [''],
      codePostal: [''],
      emailInstitutionnel: ['', Validators.email],
      handicape: [false],
      // Add more fields according to your requirements
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.candidateForm.valid) {
      console.log(this.candidateForm.value);
      // Handle form submission logic here
    }
  }
}
