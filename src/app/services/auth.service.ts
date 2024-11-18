import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userId: number | null = null;
  private role: string | null = null;

  constructor() {
    const storedUserId = localStorage.getItem('userId');
    const storedRole = localStorage.getItem('role');

    if (storedUserId) {
      this.userId = +storedUserId;
    }
    if (storedRole) {
      this.role = storedRole;
    }
  }

  setUserId(id: number) {
    this.userId = id;
    localStorage.setItem('userId', id.toString()); 
  }

  getUserId(): number | null {
    return this.userId;
  }

  clearUserId() {
    this.userId = null;
    localStorage.removeItem('userId'); // Remove userId from localStorage when needed (e.g., on logout)
  }
  setRole(role: string) {
    this.role = role;
    localStorage.setItem('role', role);
  }

  getRole(): string | null {
    return this.role;
  }

  clearRole() {
    this.role = null;
    localStorage.removeItem('role'); // Remove role from localStorage when needed (e.g., on logout)
  }
  clearAll() {
    this.clearUserId();
    this.clearRole();
  }
}
