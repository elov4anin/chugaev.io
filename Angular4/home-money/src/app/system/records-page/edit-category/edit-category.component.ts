import {Component, OnInit, Input, Output, EventEmitter, OnDestroy} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Category} from "../../shared/models/category.model";
import {CategoriesService} from "../../shared/services/categories.service";
import {Message} from "../../../shared/models/message.model";
import {Subscription} from "rxjs";

@Component({
  selector: 'wfm-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit, OnDestroy {

  subs1: Subscription;
  @Input() categories: Category[] =[];
  @Output() onCategoryEdit = new EventEmitter<Category>();

  currentCategoryId:number = 1;

  currentCategory: Category;
  message: Message;

  constructor(private categoriesService: CategoriesService ) { }

  ngOnInit() {
    this.onCategoryChange();
    this.message = new Message('success', '')
  }

  onCategoryChange() {
    this.currentCategory = this.categories.find(c => c.id === +this.currentCategoryId)

  }

  onSubmit(form: NgForm) {
    let {capacity, name} = form.value;
    if (capacity <0) {
      capacity *=-1;
    }
    const category = new Category(name, capacity, +this.currentCategoryId);

    this.subs1 = this.categoriesService.updateCategory(category)
        .subscribe((category: Category) => {
          this.onCategoryEdit.emit(category);
          this.message.text='Категория успешно отредактирована';
          window.setTimeout(()=> this.message.text ='', 5000);
        })
    }

  ngOnDestroy() {
    if (this.subs1) this.subs1.unsubscribe();

  }

}
