import {Component, OnInit, Output, ViewChild} from '@angular/core';
import { PaymentsService, Item } from '../payments.service'
import {DatatableComponent} from "@swimlane/ngx-datatable";




@Component({
  moduleId: module.id,
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})

export class PaymentsComponent implements OnInit {
  items: Item[];
  search: string;
  searchResult: Item[] = [];
  search_date: string;

  columns = [
    { prop: 'id' },
    { name: 'Date' },
    { name: 'Payer' },
    { name: 'Contractor'},
    { name: 'Purpose' },
    { name: 'Sum' },
    { name: 'State' }

  ];

  temp = [];

  @ViewChild(DatatableComponent) table: DatatableComponent;



  constructor (private  paymentsService: PaymentsService) {
    this.items = this.paymentsService.getPayments();
    this.temp = this.paymentsService.getPayments();
  }

  ngOnInit() {


  }
  updateFilter(event) {
    const val = event.target.value;
    // filter our data
    const temp = this.temp.filter(function(d) {
      return d.date.toLowerCase().indexOf(val) !== -1 ||
              d.id.toString().toLowerCase().indexOf(val) !== -1 ||
              d.payer.toLowerCase().indexOf(val) !== -1 ||
              d.contractor.toLowerCase().indexOf(val) !== -1 ||
              d.purpose.toLowerCase().indexOf(val) !== -1 ||
              d.sum.toString().toLowerCase().indexOf(val) !== -1 ||
              d.state.toLowerCase().indexOf(val) !== -1 ||!val;
    });

    // update the rows
    this.items = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

  /*  addItem(payer: string, contractor: string, purpose: string, sum: number): void {
   if(payer==null || payer==undefined || payer.trim()=="")
   return;
   if(contractor==null || contractor==undefined || payer.trim()=="")
   return;
   this.items.push(new Item(payer, contractor, purpose, sum));
   }*/

}
