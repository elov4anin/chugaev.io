import {Component, OnInit, OnDestroy} from '@angular/core';
import {CategoriesService} from "../shared/services/categories.service";
import {EventService} from "../shared/services/events.service";
import {Observable, Subscription} from "rxjs";
import {WFMEvent} from "../shared/models/event.model";
import {Category} from "../shared/models/category.model";

@Component({
  selector: 'wfm-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss']
})
export class HistoryPageComponent implements OnInit, OnDestroy {

  constructor(private categoriesService: CategoriesService, private eventsService: EventService) { }
  isLoaded: boolean = false;
  s1: Subscription;
  chartData =[];
  categories: Category[]=[];
  events: WFMEvent[] =[];

  ngOnInit() {
    Observable.combineLatest(
        this.categoriesService.getCategories(),
        this.eventsService.getEvetns()
    ).subscribe((data: [Category[], WFMEvent[]]) => {
      this.categories = data[0];
      this.events = data[1];
      this.calculateChartData();
      this.isLoaded = true;

    })
  }
  calculateChartData():void {
    this.chartData =[];
    this.categories.forEach((cat) => {
      const catEvent = this.events.filter((e) => e.category === cat.id && e.type ==='outcome');
      this.chartData.push({
        name: cat.name,
        value: catEvent.reduce((total, e) => {
          total += e.amount;
          return total;

        }, 0)
      })
    })
  }

  ngOnDestroy() {
    if (this.s1) this.s1.unsubscribe();
}

}
