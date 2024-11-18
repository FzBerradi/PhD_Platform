import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckbox
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
email : string = '';
fname : string = '';
lname : string = '';
tel : string = '';
password : string = '';
confirmedpassword : string = '';
usertype : string = "CANDIDAT";
constructor(private http : HttpClient, private router : Router){

}
signup() {
  if (this.password !== this.confirmedpassword) {
      alert('Passwords do not match!');
      return;
  }
  let body = {
      "nom": this.lname,
      "prenom": this.fname,
      "email": this.email,
      "mdp": this.password,
      "tel": this.tel,
      "userType": this.usertype
  };
  this.http.post('http://localhost:8089/phd/auth/register', body, { responseType: 'text' })
  .subscribe((response: any) => {
      alert(response);
      this.router.navigate(['/login']);
  });
}

}
