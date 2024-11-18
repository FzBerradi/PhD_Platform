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

@Component({
  selector: 'app-demande-bourse',
  standalone: true,
  imports: [  MatTableModule,
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
    MatButtonModule],
  templateUrl: './demande-bourse.component.html',
  styleUrl: './demande-bourse.component.scss'
})
export class voirDemandeBourseComponent {

  bourses: any[] = [];

  constructor(private cedService: CedService, private http: HttpClient, private router :Router) {}

  ngOnInit(): void {
    // this.cedService.getBourses().subscribe(
    //   data => {
    //     this.bourses = data;
    //     console.log(this.bourses);

    //   },
    //   error => {
    //     console.error('Error fetching bourses:', error);
    //   }
    // );

    this.cedService.getAllBourses().subscribe(bourses => {
      this.bourses = bourses;
      console.log(this.bourses);

    });
  }

  changeStatus(id: number, status: string): void {
    this.cedService.changeBourseStatus(id, status).subscribe(() => {
      console.log(`Bourse with ID ${id} changed to ${status}`);
      this.ngOnInit();
    });
  }
}
