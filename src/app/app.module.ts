import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router'; // Import RouterModule
import { MatCardModule } from '@angular/material/card'; // Import MatCardModule


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FullComponent } from './layouts/full/full.component';
import { DemoFlexyModule } from './demo-flexy-module';

// Modules
import { DashboardModule } from './dashboard/dashboard.module';
import { ComponentsModule } from './components/components.module';

// Components
import { CEDComponent } from './Users-dashboards/ced/ced.component';
import { ProfesseurComponent } from './Users-dashboards/professeur/professeur.component';
import { CreatePlanningComponent } from './create-planning/create-planning.component';
import { DisplayPlanningComponent } from './display-planning/display-planning.component';
import { MatIconModule } from '@angular/material/icon';
import { AcceuilComponent } from './acceuil/acceuil.component';
import { CandidateComponent } from './Users-dashboards/candidate/candidate.component';

@NgModule({
  declarations: [
    AppComponent,
    FullComponent,
    CreatePlanningComponent,
    DisplayPlanningComponent,


  ],
  imports: [
    BrowserModule,
    MatIconModule,
    AppRoutingModule,
    MatCardModule,
    BrowserAnimationsModule,
    RouterModule,
    FeatherModule.pick(allIcons),
    DemoFlexyModule,
    DashboardModule,
    ComponentsModule,
    FormsModule,
    AcceuilComponent,
    ReactiveFormsModule,
    HttpClientModule,
    CEDComponent,
    ProfesseurComponent,
    CandidateComponent,
   HttpClientModule,
],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
