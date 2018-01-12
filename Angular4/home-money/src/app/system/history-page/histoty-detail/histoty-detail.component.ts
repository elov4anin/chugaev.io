import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {EventService} from "../../shared/services/events.service";
import {CategoriesService} from "../../shared/services/categories.service";
import {WFMEvent} from "../../shared/models/event.model";
import {Category} from "../../shared/models/category.model";
import {Subscription} from "rxjs";

@Component({
  selector: 'wfm-histoty-detail',
  templateUrl: './histoty-detail.component.html',
  styleUrls: ['./histoty-detail.component.scss']
})
export class HistotyDetailComponent implements OnInit, OnDestroy {
  event: WFMEvent;
  category: Category;
  isLoaded: boolean = false;

  s1: Subscription;

  constructor(private  route: ActivatedRoute, private eventsService: EventService, private categoriesService: CategoriesService) { }

  ngOnInit() {
    this.s1 = this.route.params
        .mergeMap((params: Params) =>this.eventsService.getEventById(params['id']))
        .mergeMap((event: WFMEvent) => {
            this.event = event;
            return this.categoriesService.getCategoryById(event.category);
        })
        .subscribe((category: Category) => {
          this.category = category;
          this.isLoaded = true
        })
  }

  ngOnDestroy() {
    if (this.s1) this.s1.unsubscribe()
  }

}
