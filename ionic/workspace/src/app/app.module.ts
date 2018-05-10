import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import {HomePage} from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ProjectsProvider } from '../providers/projects/projects';
import {HttpClientModule} from "@angular/common/http";
import {ModalProjectsPage} from "../pages/modal-projects/modal-projects";
import { VmsProvider } from '../providers/vms/vms';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    ModalProjectsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    ModalProjectsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ProjectsProvider,
    VmsProvider
  ]
})
export class AppModule {}
