import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CalendarComponent } from './calendar.component';

const routes: Routes = [
  { path: '', component: CalendarComponent }
]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CalendarComponent]
})
export class CalendarModule { }
