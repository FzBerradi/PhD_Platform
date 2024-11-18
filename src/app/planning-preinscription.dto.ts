export interface PlanningPreincriptionDTO {
  id?: number;
  anneeUniversitaire: string;
  titre: string;
  dateReinscription: Date;
  dateDepotDossier: Date;
  datePropositionSujets: Date;
  dateValidationSujets: Date;
  dateConvocationEtudiants: Date;
  dateAffichageResultats: Date;
  dateInscription: Date;
  cedId: number | null;
}
