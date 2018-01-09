import {Component, OnDestroy, OnInit} from '@angular/core';
import {BillService} from "../shared/services/bill.service";
import {Observable} from "rxjs/Observable";
import {Bill} from "../shared/models/bill.model";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'wfm-bill-page',
  templateUrl: './bill-page.component.html',
  styleUrls: ['./bill-page.component.scss']
})
export class BillPageComponent implements OnInit, OnDestroy {

    constructor(private billService: BillService, private subscription: Subscription) {
    }

    ngOnInit() {
        Observable.combineLatest(
            this.billService.getBill(),
            this.billService.getCurrency()
        ).subscribe((data: [Bill, any]) => {


        });
    }
    ngOnDestroy() {
      this.subscription.unsubscribe();
    }

}