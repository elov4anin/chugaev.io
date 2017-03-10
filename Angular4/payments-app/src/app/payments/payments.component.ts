import {Component, OnInit} from '@angular/core';
import { PaymentsService } from '../payments.service'

export class Item {
  id: number;
  date: any;
  payer: string;
  contractor: string;
  purpose: string;
  sum: number;
  state: string;

  constructor(payer: string, contractor: string, purpose: string, sum: number) {

    this.id = 6;
    this.date = new Date();
    this.payer = payer;
    this.contractor = contractor;
    this.purpose = purpose;
    this.sum = sum;
    this.state = "Новый";
  }
}

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


  /*  addItem(payer: string, contractor: string, purpose: string, sum: number): void {
   if(payer==null || payer==undefined || payer.trim()=="")
   return;
   if(contractor==null || contractor==undefined || payer.trim()=="")
   return;
   this.items.push(new Item(payer, contractor, purpose, sum));
   }*/
}
