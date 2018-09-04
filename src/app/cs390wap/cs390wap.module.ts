import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { Cs390wapComponent } from './cs390wap.component';
const routes: Routes = [
  { path: '', component: Cs390wapComponent}
]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [Cs390wapComponent]
})
export class CS390Module { }
