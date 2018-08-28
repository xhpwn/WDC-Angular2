import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from './home/home.component';

export const APP_ROUTES: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component:  HomeComponent },
  { path: 'tracks', loadChildren: './tracks/tracks.module#TracksModule' },
  { path: 'calendar', loadChildren: './calendar/calendar.module#CalendarModule' },
  { path: 'faq', loadChildren: './faq/faq.module#FaqModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(APP_ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule {}