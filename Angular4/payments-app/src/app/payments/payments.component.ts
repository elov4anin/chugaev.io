import {Component, OnInit, Output} from '@angular/core';
import { PaymentsService, Item } from '../payments.service'
import { SearchComponent } from '../search/search.component';



@Component({
  moduleId: module.id,
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})

export class PaymentsComponent implements OnInit {
  items: Item[];

  constructor (private  paymentsService: PaymentsService) {}

  ngOnInit() {
    this.items = this.paymentsService.getPayments();
  }
  paySubmitted: boolean = false;



  /*  addItem(payer: string, contractor: string, purpose: string, sum: number): void {
   if(payer==null || payer==undefined || payer.trim()=="")
   return;
   if(contractor==null || contractor==undefined || payer.trim()=="")
   return;
   this.items.push(new Item(payer, contractor, purpose, sum));
   }*/
}
