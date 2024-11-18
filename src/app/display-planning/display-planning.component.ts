import { Component, OnInit } from '@angular/core';
import { PlanningService } from '../planning.service';
import { PlanningPreincriptionDTO } from '../planning-preinscription.dto';
import { CalendarMonthViewDay } from 'angular-calendar';
import { isSameDay } from 'date-fns';
import { Router } from '@angular/router';

@Component({
  selector: 'app-display-planning',
  templateUrl: './display-planning.component.html',
  styleUrls: ['./display-planning.component.scss']
})
export class DisplayPlanningComponent implements OnInit {
  plannings: PlanningPreincriptionDTO[] = [];
  isLoading: boolean = true;
  viewDate: Date = new Date();
  events: any[] = [];
  router: any;

  constructor(private planningService: PlanningService) {}

  ngOnInit(): void {
    this.getAllPlannings();
  }

  getAllPlannings() {
    this.planningService.getAllPlannings().subscribe(data => {
      this.plannings = data;
      this.events = this.plannings.map(planning => ({
        start: new Date(planning.dateReinscription),
        title: planning.titre,
        meta: planning
      }));
      this.isLoading = false;
    }, error => {
      console.error('Error fetching plannings:', error);
      this.isLoading = false;
    });
  }

  dayClicked(day: CalendarMonthViewDay) {
    const clickedEvents = this.events.filter(event => isSameDay(event.start, day.date));
    if (clickedEvents.length > 0) {
      console.log(clickedEvents); // Afficher les événements de ce jour
    }
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
