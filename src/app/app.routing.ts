import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";

import { HomeComponent } from "./home/home.component";
import { CalendarComponent } from "./calendar/calendar.component";


export const APP_ROUTES: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'calendar', component: CalendarComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(APP_ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

//export const routings = 
