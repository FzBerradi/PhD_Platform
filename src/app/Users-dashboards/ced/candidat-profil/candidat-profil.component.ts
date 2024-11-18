import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CedService } from 'src/app/service/ced.service';
import { faDownload } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-candidat-profil',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './candidat-profil.component.html',
  styleUrl: './candidat-profil.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class CandidatProfilComponent {
  faDownload = faDownload;
  photoUrl: string | undefined;
candidat = {
    "adresse": "123 Main St, Anytown, USA",
    "anneeObtentionBac": 2020,
    "anneeObtentionLicence": 2023,
    "anneeObtentionMaster": 2025,
    "auDates": "2020-09-01 to 2021-05-15",
    "baccalaureatScanne": "bac.pdf",
    "candidatProfession": "Software Developer",
    "carteNationaleScanne": "https://example.com/carte_nationale_scanned.jpg",
    "cin": "ABC123456",
    "cne": "9999",
    "codePostal": "12345",
    "cvScanne": "https://example.com/cv_scanned.pdf",
    "dateNaissance": "1998-07-15",
    "duDates": "2020-06-01 to 2020-08-31",
    "email": "wiam@example.com",
    "emailInstitutionnel": "wiam.university@example.com",
    "experienceProfessionnelle": true,
    "filiereBac": "Science and Technology",
    "fonctionnaire": false,
    "fonctions": "Full Stack Developer",
    "handicape": false,
    "idCandidate": 1,
    "idUser": 1,
    "langues": ["English", "French", "Spanish"],
    "licenceScanne": "https://example.com/licence_scanned.jpg",
    "lieuNaissance": "Anytown, USA",
    "masterScanne": "https://example.com/master_scanned.jpg",
    "mentionBac": "Bien",
    "mentionLicence": "Très Bien",
    "mentionMaster": "Excellent",
    "moyenneBac": 11,
    "moyenneLicence": 22,
    "moyenneMaster": 18,
    "nationalite": "American",
    "niveauxLangues": {
        "English": "C1",
        "French": "B2",
        "Spanish": "B1"
    },
    "nom": "",
    "nomLycee": "Lycee de Anytown",
    "nomUniversiteLicence": "University of Anytown",
    "nomUniversiteMaster": "Institute of Technology",
    "organisme": "Tech Solutions",
    "organismeEmployeur": "Global Tech Corp",
    "pays": "USA",
    "paysBac": "USA",
    "paysLicence": "USA",
    "paysMaster": "USA",
    "paysNaissance": "USA",
    "photo": "",
    "prenom": "hd",
    "professionMere": "Teacher",
    "professionPere": "Engineer",
    "provinceBac": "California",
    "provinceNaissance": "California",
    "releveNoteLicenceScanne": "",
    "releveNoteMasterScanne": "https://example.com/releve_note_master_scanned.jpg",
    "secteurs": ["IT", "Software Development"],
    "sexe": "Male",
    "situationFamiliale": "",
    "specialiteLicence": "Computer Science",
    "specialiteMaster": "Software Engineering",
    "statutMaster": "In Progress"
};
  candidatId: number =0;
  constructor(private router :ActivatedRoute, private cedService: CedService){}

  ngOnInit(): void {
  this.router.paramMap.subscribe(
    params=>{
      this.candidatId = +params.get('id')!;
      console.log(this.candidatId);
    }
  )

  this.fetchCandidat(this.candidatId);
  }
  fetchCandidat(id: number): void {
    this.cedService.getCandidatById(id).subscribe(
      (candidat: any) => {
        this.candidat = candidat;
        console.log(this.candidat)
        this.fetchCandidatPhoto(this.candidat.photo);


      },
      (error) => {
        console.error('Error fetching candidatures:', error);
      }
    );
  }

  download(filename: string): void {
    this.cedService.getFile(filename).subscribe(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }, error => {
        console.error('Download failed', error);
    });
}

fetchCandidatPhoto(photoFileName: string): void {
  this.cedService.getFile(photoFileName).subscribe(
    (photoBlob: Blob) => {
      this.photoUrl = URL.createObjectURL(photoBlob);
    },
    (error) => {
      console.error('Error fetching candidate photo:', error);
    }
  );
}
}


