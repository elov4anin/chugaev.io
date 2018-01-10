import {Component, OnInit, OnDestroy} from '@angular/core';

import {BillService} from "../shared/services/bill.service";
import {CategoriesService} from "../shared/services/categories.service";
import {EventService} from "../shared/services/events.service";

import {Observable, Subscription} from "rxjs";

import {WFMEvent} from "../shared/models/event.model";
import {Bill} from "../shared/models/bill.model";
import {Category} from "../shared/models/category.model";

@Component({
  selector: 'wfm-planning-page',
  templateUrl: './planning-page.component.html',
  styleUrls: ['./planning-page.component.scss']
})
export class PlanningPageComponent implements OnInit, OnDestroy {
  s1: Subscription;
  isLoaded:boolean = false;
  bill: Bill;
  categories: Category[];
  events: WFMEvent[];

  constructor(
      private billService:BillService,
      private categoriesService: CategoriesService,
      private eventService:EventService
  ) { }

  ngOnInit() {
    this.s1 = Observable.combineLatest(
        this.billService.getBill(),
        this.categoriesService.getCategories(),
        this.eventService.getEvetns()
    ).subscribe((data: [Bill, Category[], WFMEvent[]]) => {
      console.log(data);

      this.bill = data[0];
      this.categories =data[1];
      this.events = data[2];

      this.isLoaded = true;

    });
  }
  ngOnDestroy() {
    if (this.s1) {
      this.s1.unsubscribe();
    }

  }

}
