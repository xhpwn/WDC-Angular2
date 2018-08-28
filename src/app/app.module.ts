import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Ng2PageScrollModule } from 'ng2-page-scroll';
import { CollapseModule } from 'ngx-bootstrap';
import { ServiceWorkerModule } from '@angular/service-worker';
import { LazyLoadImageModule } from 'ng-lazyload-image';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AppRoutingModule } from './app.routing';
import { FaqComponent } from './faq/faq.component';
import { environment } from '../environments/environment';
import { HomeModule } from './home/home.module';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HomeModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    AppRoutingModule,
    CollapseModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
