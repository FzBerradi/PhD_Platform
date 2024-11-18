// src/app/create-planning/create-planning.component.ts

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PlanningService } from '../planning.service';
import { PlanningPreincriptionDTO } from '../planning-preinscription.dto';

@Component({
  selector: 'app-create-planning',
  templateUrl: './create-planning.component.html',
  styleUrls: ['./create-planning.component.scss']
})
export class CreatePlanningComponent {

  planning: PlanningPreincriptionDTO = {
    anneeUniversitaire: '',
    titre: '',
    dateReinscription: new Date(),
    dateDepotDossier: new Date(),
    datePropositionSujets: new Date(),
    dateValidationSujets: new Date(),
    dateConvocationEtudiants: new Date(),
    dateAffichageResultats: new Date(),
    dateInscription: new Date(),
    cedId: null // Assuming cedId is handled in the service or determined elsewhere
  };

  constructor(public planningService: PlanningService, public router: Router) {}

  createPlanning() {
    this.planningService.createPlanning(this.planning).subscribe(response => {
      console.log('Planning created:', response);
      alert('Planning created successfully!');
      this.router.navigate(['users/ced']);
    }, error => {
      console.error('Error creating planning:', error);
      alert('Failed to create planning.');
    });
  }
}
