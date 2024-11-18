import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { AuthService } from 'src/app/services/auth.service';

interface sidebarMenu {
  link: string;
  icon: string;
  menu: string;
}

@Component({
  selector: 'app-full',
  templateUrl: './full.component.html',
  styleUrls: ['./full.component.scss'],

})
export class FullComponent {
//le role pour afficher dash convenable
  user: string = "";
  userType: string | null = null;

  search: boolean = false;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

    hideComponenets: boolean = false; // hide sidebar
    drawer: any;
    constructor(private breakpointObserver: BreakpointObserver, private router: Router, private auth : AuthService) {
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          const noSidebarRoutes = ['/login', '/register', '/acceuil', '/display-planning'];
          this.hideComponenets = noSidebarRoutes.includes(event.urlAfterRedirects);

        }
      });


     }
  routerActive: string = "activelink";

  ngOnInit() {
    this.userType = this.auth.getRole();

    if (this.userType == "CED") {
      this.sidebarMenu = [
        {
          link: "/users/ced",
          icon: "home",
          menu: "Dashboard ced",
        },
        {
          link: "/users/ced/structure",
          icon: "file-text",
          menu: "Structures de Recherche", // section pour voir les sturctures de recherche et les sujts par etablissment
        },
        {
          link: "/users/ced/preinscription",
          icon: "layout",
          menu: "Les préinscriptions", // le statut de chaque préinscription
        },
        {
          link: "/create-planning",
          icon: "layout",
          menu: "Planification Preinscription", // le statut de chaque préinscription
        },
        {
          link: "/users/ced/formalite",
          icon: "divide-circle",
          menu: "Formalités administratives", // les formalités administratives
        },
        {
          link: "/users/ced/bourse",
          icon: "layers",
          menu: "Les bourses",
        },
      ];
    }
    else if (this.userType == "CANDIDAT") {
      this.sidebarMenu = [
        // {
        //   link: "/users/candidate",
        //   icon: "home",
        //   menu: "Dashboard Candidate",
        // },
        {
          link: "/users/candidate/sujet",
          icon: "disc",
          menu: "Choix des Sujets",
        },
        {
          link: "/users/candidate/candidature",
          icon: "layout",
          menu: "Mes Candidature",
        },
        {
          link: "/users/candidaate/suivi",
          icon: "menu",
          menu: "suivi candidature",
        },
        {
          link: "/users/candidate/bourse",
          icon: "divide-circle",
          menu: "Demande de Bourse",
        },
      ];
    }
    else if (this.userType == "PROFESSEUR") {
      this.sidebarMenu = [
        {
          link: "/users/professeur",
          icon: "home",
          menu: "Dashboard PROF",
        },
        {
          link: "/users/professeur/MesSujets",
          icon: "disc",
          menu: "Mes Sujets",
        },
        {
          link: "users/professeur/mescandidates",
          icon: "disc",
          menu: "Gestion Des Candidatures",
        },
        {
          link: "/users/professeur/entretiens",
          icon: "layout",
          menu: "Les Candidats Convoques",
        },
        {
          link: "/users/professeur/MesDoctorants",
          icon: "menu",
          menu: "Suivi des Doctorants",
        },
      ];
    }
    else  {
      this.sidebarMenu = [
        {
              link: "/acceuil",
              icon: "home",
              menu: "Dashboard",
            },
            {
              link: "/button",
              icon: "disc",
              menu: "Buttons",
            },
            {
              link: "/forms",
              icon: "layout",
              menu: "Forms",
            },
            {
              link: "/alerts",
              icon: "info",
              menu: "Alerts",
            },
            {
              link: "/grid-list",
              icon: "file-text",
              menu: "Grid List",
            },
            {
              link: "/menu",
              icon: "menu",
              menu: "Menus",
            },
            {
              link: "/table",
              icon: "grid",
              menu: "Tables",
            },
            {
              link: "/expansion",
              icon: "divide-circle",
              menu: "Expansion Panel",
            },
            {
              link: "/chips",
              icon: "award",
              menu: "Chips",
            },
            {
              link: "/tabs",
              icon: "list",
              menu: "Tabs",
            },
            {
              link: "/progress",
              icon: "bar-chart-2",
              menu: "Progress Bar",
            },
            {
              link: "/toolbar",
              icon: "voicemail",
              menu: "Toolbar",
            },
            {
              link: "/progress-snipper",
              icon: "loader",
              menu: "Progress Snipper",
            },
            {
              link: "/tooltip",
              icon: "bell",
              menu: "Tooltip",
            },
            {
              link: "/snackbar",
              icon: "slack",
              menu: "Snackbar",
            },
            {
              link: "/slider",
              icon: "sliders",
              menu: "Slider",
            },
            {
              link: "/slide-toggle",
              icon: "layers",
              menu: "Slide Toggle",
            }
      ];
    }
  }
  logout() {
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']).then(() => {
      window.location.reload(); // Force a full page reload
    });
  }
  
  goToEditProfile(): void {
    this.router.navigate(['/edit']);
  }
  sidebarMenu: sidebarMenu[] = [];

  // sidebarMenu: sidebarMenu[] = [
  //   {
  //     link: "/home",
  //     icon: "home",
  //     menu: "Dashboard",
  //   },
  //   {
  //     link: "/button",
  //     icon: "disc",
  //     menu: "Buttons",
  //   },
  //   {
  //     link: "/forms",
  //     icon: "layout",
  //     menu: "Forms",
  //   },
  //   {
  //     link: "/alerts",
  //     icon: "info",
  //     menu: "Alerts",
  //   },
  //   {
  //     link: "/grid-list",
  //     icon: "file-text",
  //     menu: "Grid List",
  //   },
  //   {
  //     link: "/menu",
  //     icon: "menu",
  //     menu: "Menus",
  //   },
  //   {
  //     link: "/table",
  //     icon: "grid",
  //     menu: "Tables",
  //   },
  //   {
  //     link: "/expansion",
  //     icon: "divide-circle",
  //     menu: "Expansion Panel",
  //   },
  //   {
  //     link: "/chips",
  //     icon: "award",
  //     menu: "Chips",
  //   },
  //   {
  //     link: "/tabs",
  //     icon: "list",
  //     menu: "Tabs",
  //   },
  //   {
  //     link: "/progress",
  //     icon: "bar-chart-2",
  //     menu: "Progress Bar",
  //   },
  //   {
  //     link: "/toolbar",
  //     icon: "voicemail",
  //     menu: "Toolbar",
  //   },
  //   {
  //     link: "/progress-snipper",
  //     icon: "loader",
  //     menu: "Progress Snipper",
  //   },
  //   {
  //     link: "/tooltip",
  //     icon: "bell",
  //     menu: "Tooltip",
  //   },
  //   {
  //     link: "/snackbar",
  //     icon: "slack",
  //     menu: "Snackbar",
  //   },
  //   {
  //     link: "/slider",
  //     icon: "sliders",
  //     menu: "Slider",
  //   },
  //   {
  //     link: "/slide-toggle",
  //     icon: "layers",
  //     menu: "Slide Toggle",
  //   },
  // ]

}
