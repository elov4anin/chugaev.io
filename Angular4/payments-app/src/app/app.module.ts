import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { SignComponent } from './sign/sign.component';
import { PaymentsComponent } from './payments/payments.component';
import  { PaymentsService } from './payments.service';
import { SearchComponent } from './search/search.component';

@NgModule({
  declarations: [
    AppComponent,
    SignComponent,
    PaymentsComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [PaymentsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
