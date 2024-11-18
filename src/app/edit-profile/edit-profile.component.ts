import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [
    MatIconModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckbox
  ],
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'] // Fix 'styleUrl' to 'styleUrls'
})
export class EditProfileComponent implements OnInit {
  email: string = '';
  fname: string = '';
  lname: string = '';

  tel: string = '';
  password: string = '';
  confirmedpassword: string = '';
  userId: number | null = null;
  userType: string | null = null;
  constructor(private auth: AuthService, private http: HttpClient) {}

  ngOnInit() {
    this.userId = this.auth.getUserId(); 
    this.userType = this.auth.getRole();
    console.log(this.userId);
    console.log(this.userType);
    if (this.userId) {
      this.fetchUserData(this.userId); // Fetch user data when the component initializes
    }
  }


  fetchUserData(userId: number) {
    this.http.get(`http://localhost:8089/phd/auth/getuser/${userId}`).subscribe(
      (data: any) => {
        // Assume your API returns an object with user details
        this.fname = data.prenom;
        this.lname = data.nom;
        this.email = data.email;
        this.tel = data.tel;
      },
      (error) => {
        console.error('Error fetching user data', error);
      }
    );
  }

  update() {
    const updatedUserData = {
      "prenom": this.fname,
      "nom": this.lname,
      "email": this.email,
      "tel": this.tel,
      "idUser": this.userId,
      "userType": this.userType
    };

 
    this.http.put('http://localhost:8089/phd/auth/edit', updatedUserData,  { responseType: 'text' }).subscribe(
      (response) => {
    alert(response);
  },
  (error) => {
   alert('Error updating user data');
  }
);

  }
}
