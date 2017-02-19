import { Routes, RouterModule } from "@angular/router";

import { HomeComponent } from "./home/home.component";
import { CalendarComponent } from "./calendar/calendar.component";

const APP_ROUTES: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'calendar', component: CalendarComponent }
];

export const routings = RouterModule.forRoot(APP_ROUTES);
