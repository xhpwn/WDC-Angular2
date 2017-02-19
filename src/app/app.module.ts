import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {Ng2PageScrollModule} from 'ng2-page-scroll';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TracksComponent } from './tracks/tracks.component';
import { CalendarComponent } from './calendar/calendar.component';
import { AppRoutingModule } from './app.routing';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    TracksComponent,
    CalendarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    Ng2PageScrollModule.forRoot(),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
