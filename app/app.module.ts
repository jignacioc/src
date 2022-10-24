import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

//forms
import { FormsModule } from '@angular/forms';

//fire
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';

//Enviroment
import { environment } from '../environments/environment';

//Auth Service

import { AuthService } from './services/auth.service'

//Auth Guard

import { AuthGuard } from './guards/auth.guard'

//npm install @ionic/storage-angular

import { IonicStorageModule } from '@ionic/storage-angular';
import { StatusBar } from '@awesome-cordova-plugins/status-bar/ngx';

// geolication

import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    IonicStorageModule.forRoot(),
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireStorageModule

  ],
  providers: [
    AuthService,
    AuthGuard,
    StatusBar,
    Geolocation,
    {provide: RouteReuseStrategy, useClass: IonicRouteStrategy
  }],
  bootstrap: [AppComponent],
})
export class AppModule {}
