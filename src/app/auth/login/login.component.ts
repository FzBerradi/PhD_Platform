import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Route, Router, RouterModule } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckbox,
    MatIconModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',

})
export class LoginComponent {
email : string = '';
password : string = '';
isPasswordVisible: boolean = false;

  constructor(private http : HttpClient, private router : Router, private auth : AuthService) { }

  ngOnInit(): void {
  }

  login(){
    let data = {
      "email" : this.email,
      "mdp" : this.password
    }
    this.http.post('http://localhost:8089/phd/auth/login', data, { responseType: 'text' })
    .subscribe((response: any) => {
      try {
        const parsedResponse = JSON.parse(response);
console.log(parsedResponse);
console.log(response);
        if (parsedResponse.status === 'success') {
          const role = parsedResponse.role;
          this.auth.setUserId(parsedResponse.idUser);
          console.log(role);
          this.auth.setRole(role);
          if (role === 'CANDIDAT') {
            this.router.navigate(['/users/candidate']);
          } else if (role === 'CED') {
            this.router.navigate(['/users/ced']);
          } else if (role === 'PROFESSEUR') {
            this.router.navigate(['/users/professeur']);
          } else {
            alert('Unrecognized role!');
          }
        } else {
          alert(parsedResponse.message || 'Login failed');
        }
      } catch (error) {
        alert('Unexpected response format');
      }
    }, error => {
      console.error('Login request failed', error);
      alert('Login request failed');
    });
}
togglePasswordVisibility(): void {
  this.isPasswordVisible = !this.isPasswordVisible;
}

}
