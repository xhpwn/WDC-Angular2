import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { Ng2PageScrollModule } from 'ng2-page-scroll';
import { LazyLoadImageModule } from 'ng-lazyload-image';

@NgModule({
  imports: [
    CommonModule,
    Ng2PageScrollModule.forRoot(),
    LazyLoadImageModule
  ],
  declarations: [HomeComponent]
})
export class HomeModule { }
