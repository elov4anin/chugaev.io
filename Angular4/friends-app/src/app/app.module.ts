import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { FriendListComponent } from './friend-list/friend-list.component';
import {VkService} from "./vk.service";
import {Router} from "@angular/router";

@NgModule({
  declarations: [
    AppComponent,
    FriendListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [VkService, Router],
  bootstrap: [AppComponent]
})
export class AppModule { }
