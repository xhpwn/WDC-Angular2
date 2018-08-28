import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { TracksComponent } from './tracks.component';
const routes: Routes = [
  { path: '', component: TracksComponent}
]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TracksComponent]
})
export class TracksModule { }
