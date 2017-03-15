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
  search: string;
  searchResult: Item[];

  constructor (private  paymentsService: PaymentsService) {}

  ngOnInit() {

    this.items = this.paymentsService.getPayments();
  }

  searchPayments() {
    console.log(this.search);
    let i = 0;
    for (; i< this.items.length; i++) {
      if ((this.items[i].date.indexOf(this.search)) ||
          (this.items[i].payer.indexOf(this.search)) ||
          (this.items[i].contractor.indexOf(this.search)) ||
          (this.items[i].purpose.indexOf(this.search)) ||
          (this.items[i].state.indexOf(this.search))) {
        console.log(this.items[i]);
        this.searchResult.push(this.items[i]);
      }
      console.log (this.searchResult);
      this.items = this.searchResult;
    }
  }



  /*  addItem(payer: string, contractor: string, purpose: string, sum: number): void {
   if(payer==null || payer==undefined || payer.trim()=="")
   return;
   if(contractor==null || contractor==undefined || payer.trim()=="")
   return;
   this.items.push(new Item(payer, contractor, purpose, sum));
   }*/
}
