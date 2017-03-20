import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { PaymentsComponent } from './payments/payments.component';
import  { PaymentsService } from './payments.service';
import {SignService} from "./sign.service";
import { NgxDatatableModule } from '@swimlane/ngx-datatable';


@NgModule({
  declarations: [
    AppComponent,
    PaymentsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgxDatatableModule,

  ],
  providers: [PaymentsService, SignService],
  bootstrap: [AppComponent]
})
export class AppModule { }
