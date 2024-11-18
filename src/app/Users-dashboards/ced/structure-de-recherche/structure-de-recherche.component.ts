import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { CedService } from 'src/app/service/ced.service';
import { FormsModule } from '@angular/forms';  // Import FormsModule
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';

// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs'; // Import MatTabsModule

// etablissement.model.ts
export class Etablissement {
  idEtablissement?: number;
  nomEtablissement: string;
  adresseEtablissement: string;
  ville: string;
  idCED?: number;
  structures: Structure[];

  constructor() {
    this.nomEtablissement = '';
    this.adresseEtablissement = '';
    this.ville = '';
    this.idCED = 0;
    this.structures = [];
  }
}
export class Structure {
  typeStructure: string;
  nom: string;
  idEtablissement: number;
  constructor() {
    this.typeStructure = '';
    this.nom = '';
    this.idEtablissement = 0;
  }
}
export class Professeur {
  prenom: string;
  nom: string;
  email: string;
  password: any;
  tel: string;
  adresse: string;
  grade: string;
  idEtablissement?: number;
  idStructureRecherche?: number;

  constructor() {
    this.prenom = '';
    this.nom = '';
    this.email = '';
    this.password = '';
    this.tel = '';
    this.adresse = '';
    this.grade = '';
    this.idEtablissement = 0;
    this.idStructureRecherche = 0;
  }
}
@Component({
  selector: 'app-structure-de-recherche',
  standalone: true,
  imports: [HttpClientModule, CommonModule, FormsModule, MatCardModule, MatTableModule,
    MatCardModule, 
    MatTabsModule
  ],
  templateUrl: './structure-de-recherche.component.html',
  styleUrl: './structure-de-recherche.component.scss'
})
export class StructureDeRechercheComponent {
[x: string]: any;
displayedColumns: string[] = ['nomEtablissement', 'adresseEtablissement', 'ville', 'structures'];

  ceds : any[] = [];
  idCED =1;
  selectedCedId: number | null = null;
  etablissements: any[] = [];
  structures: any[] = [];
  professeurs: any[] = [];
  selectedEtablissementId: number | null = null;
  selectedStructureId: number | null = null;
  // selectedProfessors: { [key: number]: any[] | null } = {};
  selectedProfessors: { [key: number]: any[] } = {};




  constructor(private cedService: CedService, private http : HttpClient) {};

  ngOnInit(): void {
    // this.fetchAllCeds();
    // this.fetchAllEtablissements();

    this.loadEtablissements();
    this.loadProfessors();

  }

  professors : any [] = [];
  loadProfessors(): void {
    this.cedService.getAllProfessors().subscribe(
      (data) => {
        this.professors = data;
        console.log('prof ', this.professors)
      },
      (error) => {
        console.error('Error fetching professors:', error);
      }
    );
  }


  isSubjectsModalOpen = false;
  selectedProfessor: any; // Adjust type as needed
  selectedSubjects: any[] = [];


  // openSubjectsModal(professor: any) {
  //   this.selectedProfessor = professor;

  //   this.fetchSubjects(professor.idProfesseur);

  //   this.isSubjectsModalOpen = true;
  // }

  // fetchSubjects(professorId: number) {
  //   this.selectedSubjects = [
  //     { id: 1, name: 'Mathematics' },
  //     { id: 2, name: 'Physics' }
  //   ];
  // }

  openSubjectsModal(idProfesseur: number) {
    this.selectedProfessor = idProfesseur;
    console.log('Selected Professor ID:', idProfesseur);
    // Fetch the subjects for the selected professor
    this.cedService.getSubjectsByProfessorId(idProfesseur).subscribe(
      (subjects) => {
        this.selectedSubjects = subjects;
        console.log('Subjects fetched:', this.selectedSubjects);
        this.isSubjectsModalOpen = true; // Open the modal after fetching subjects
      },
      (error) => {
        console.error('Error fetching subjects:', error);
        this.selectedSubjects = []; // Clear subjects if there's an error
      }
    );
  }
  closeSubjectsModal() {
    this.isSubjectsModalOpen = false;
    this.selectedProfessor = null;
    this.selectedSubjects = [];
  }






  loadEtablissements(): void {
    this.cedService.getAllEtablissementsWithStructures().subscribe(
      (data) => {
        this.etablissements = data;
        console.log('Etablissements with structures:', this.etablissements);
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }
  expandedIndex: number | null = null; // Tracks the currently expanded row

  toggleDropdown(index: number): void {
    this.expandedIndex = this.expandedIndex === index ? null : index;
  }


  // loadEtablissements(): void {
  //   const idCED =1;
  //   this.cedService.getAllEtablissements(idCED).subscribe(data => {
  //     this.etablissements = data;
  //     console.log( this.etablissements);
  //   });
  // }

  onEtablissementSelect(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const idEtablissement = Number(target.value);
    this.selectedEtablissementId = idEtablissement;

    if (idEtablissement) {
      this.cedService.getStructuresByEtablissement(idEtablissement).subscribe(data => {
        this.structures = data;
        console.log(this.structures);
      });
    } else {
      this.structures = [];
    }
  }
  expandedEstablishments: Set<number> = new Set(); // To keep track of expanded establishments

  isExpanded(id: number): boolean {
    return this.expandedEstablishments.has(id);
  }

  // onStructureSelect(idStructure: number): void {
  //   console.log('Selected structure:', idStructure);
  //   this.selectedStructureId = idStructure;
  //   this.cedService.getProfesseursByStructure(idStructure).subscribe(data => {
  //     this.selectedProfessors[idStructure] = data.length > 0 ? data : null;
  //     console.log(this.selectedProfessors);
  //   });
  // }

  onStructureSelect(idStructure: number): void {
    console.log('Selected structure:', idStructure);
    this.selectedStructureId = idStructure;
    this.cedService.getProfesseursByStructure(idStructure).subscribe(data => {
      this.selectedProfessors[idStructure] = data.length > 0 ? data : [];
      console.log(this.selectedProfessors);
    });
  }


  fetchAllCeds():void{
    this.cedService.getAllCed()
      .subscribe(
        (response: any) => {
        this.ceds = response;
        console.log('CEDs fetched:', this.ceds);
      },
      (error) => {
        console.error('Error fetching CEDs:', error);
      }
      );
      console.log("hey");
    console.log("hey" , this.ceds);
  }

  fetchAllEtablissements():void{
    this.cedService.getAllEtablissemnt()
      .subscribe(
        (response: any) => {
        this.etablissements = response;
      },
      (error) => {
        console.error('Error fetching CEDs:', error);
        // alert('Failed to fetch CEDs.'); // Alert on error
      }
      );
      console.log("hey");
    console.log("hey" , this.ceds);
  }


   onCEDSelect():void{
    if(this.selectedCedId){
      console.log("hh" , this.selectedCedId)
      this.cedService.getAllEtablissemntByCEd(this.selectedCedId)
      .subscribe(
        (response: any) => {
        this.etablissements = response;
      console.log(this.etablissements)
      },
      (error) => {
        console.error('Error fetching CEDs:', error);
        // alert('Failed to fetch CEDs.'); // Alert on error
      }
      );
    }else{
      this.etablissements =[];
    }
   }



  isModalOpen = false;
  isStrModalOpen=false;
  isProfModalOpen = false;
  etablissement: Etablissement = new Etablissement();
  structure: Structure = new Structure();
  professeur: Professeur = new Professeur();
  successMessage :string = '';


  onSubmit() {
    if (this.etablissement && this.etablissement.nomEtablissement) {
        // Submit Etablissement data
        this.cedService.addEtablissement(this.idCED, this.etablissement).subscribe(
            (response: string) => {
                console.log('Etablissement added:', response);
                this.successMessage = response;
                this.loadEtablissements();
                // this.etablissement=  null ;

            },
            (error: any) => {
                console.error('Error adding Etablissement:', error);
            }
        );
    }

else  if (this.selectedEtablissementId !== null && this.structure.nom) { // Check if it's not null
    this.cedService.addStructureRecherche(this.selectedEtablissementId, this.structure).subscribe(
        (response: string) => {
            console.log('Structure de recherche added:', response);
            this.successMessage = response;
        },
        (error: any) => {
            console.error('Error adding Structure de recherche:', error);
        }
    );
}
  else if (this.professeur) {
        // Submit Professeur data
        this.professeur.idEtablissement = this.selectedEtablissementId ?? 0;
        this.professeur.idStructureRecherche = this.selectedEtablissementId ?? 0;
        console.log('Professeur:', this.professeur);
        this.cedService.addProfesseur(this.idCED, this.professeur).subscribe(
            (response: string) => {
                // this.professeur.idEtablissement = this.selectedEtablissementId || 0;
                // this.professeur.idStructureRecherche = this.selectedStructureId || 0;
                // professeur: Professeur | null = null;
                this.successMessage = response;


            },
            (error: any) => {
                console.error('Error adding Professeur:', error);
            }
        );
    }

                // this.professeur.idEtablissement = this.selectedEtablissementId || 0;
                // this.professeur.idStructureRecherche = this.selectedStructureId || 0;
    // Close the modal after submission
    console.log(this.selectedEtablissementId)
    this.close();
}








  close() {
    if(this.isModalOpen){
      this.isModalOpen = false;
    }
    else if(this.isStrModalOpen){
      this.isStrModalOpen = false;
    }

    else if(this.isProfModalOpen){
      this.isProfModalOpen = false;
    }



    this.resetForm();
  }

  resetForm() {
    this.etablissement = new Etablissement();
    this.professeur = new Professeur();
    this.structure = new Structure();
  }
}
