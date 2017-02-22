import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";

import { HomeComponent } from "./home/home.component";
import { CalendarComponent } from "./calendar/calendar.component";
import { TracksComponent } from "./tracks/tracks.component";
import { FaqComponent } from "./faq/faq.component";


export const APP_ROUTES: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'tracks', component: TracksComponent },
  { path: 'calendar', component: CalendarComponent },
  { path: 'faq', component: FaqComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(APP_ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule {}