import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-acceuil',
  standalone: true,
  imports: [],
  templateUrl: './acceuil.component.html',
  styleUrls: ['./acceuil.component.scss']
})
export class AcceuilComponent {
  isLoading = true;

  constructor(private router: Router) {
    // Simulate loading with a timeout
    setTimeout(() => {
      this.isLoading = false; // Stop spinner after 3 seconds
    }, 3000);
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }

  navigateToDisplayPlanning() {
    this.router.navigate(['/display-planning']);
  }
}
