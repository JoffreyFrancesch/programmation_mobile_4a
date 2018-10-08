import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home'; 
import { DetailsPage } from '../pages/details/details'
import { AddFilmPage } from '../pages/add-film/add-film'
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule, AngularFireDatabase } from '@angular/fire/database';

export const firebaseConfig = {
  apiKey: "AIzaSyC77WyxkovcbGyiMuTZshqVn-V9HOfcLnU",
  authDomain: "mylistfilmproject.firebaseapp.com",
  databaseURL: "https://mylistfilmproject.firebaseio.com",
  projectId: "mylistfilmproject",
  storageBucket: "mylistfilmproject.appspot.com",
  messagingSenderId: "466523196352"
};

@NgModule({
  declarations: [MyApp, HomePage, DetailsPage, AddFilmPage],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [MyApp, HomePage, DetailsPage, AddFilmPage],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFireDatabase,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule {}
