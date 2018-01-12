import {Component, Output, EventEmitter, OnInit, OnDestroy} from '@angular/core';
import {NgForm} from "@angular/forms";
import {CategoriesService} from "../../shared/services/categories.service";
import {Category} from "../../shared/models/category.model";
import {Message} from "../../../shared/models/message.model";
import {Subscription} from "rxjs";


@Component({
  selector: 'wfm-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit, OnDestroy {
  subs1: Subscription;
  @Output() onCategoryAdd = new EventEmitter<Category>();
  message: Message;

  constructor(private categoriesService: CategoriesService) { }
  ngOnInit() {

    this.message = new Message('success', '');
  }

  onSubmit(form: NgForm) {
    let {name, capacity} = form.value;
    if (capacity <0) {
      capacity *=-1;
    }
    const category = new Category(name, capacity);

    this.subs1 = this.categoriesService.addCategory(category)
        .subscribe((category:Category) => {
            this.message.text='Категория успешно добавлена';
            window.setTimeout(()=> this.message.text ='', 5000);
            form.reset();
            form.form.patchValue({category: 1});
            this.onCategoryAdd.emit(category)
        });

  }
  ngOnDestroy() {
    if (this.subs1) this.subs1.unsubscribe();

  }
}
