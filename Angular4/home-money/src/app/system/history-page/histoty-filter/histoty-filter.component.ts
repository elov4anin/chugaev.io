import {Component, Output, EventEmitter, Input} from '@angular/core';
import {Category} from "../../shared/models/category.model";

@Component({
  selector: 'wfm-histoty-filter',
  templateUrl: './histoty-filter.component.html',
  styleUrls: ['./histoty-filter.component.scss']
})
export class HistotyFilterComponent {
  @Output() onFilterCancel = new EventEmitter<any>();
  @Output() onFilterApply = new EventEmitter<any>();

  @Input() categories:Category[]=[];

  timePeriods = [
    {type: 'd', label: 'День'},
    {type: 'w', label: 'Неделя'},
    {type: 'M', label: 'Месяц'},
  ];

  selectedPeriod = 'd';
  selectedTypes =[];
  selectedCategories=[];

  types = [
    {type: 'income', label: 'Доход'},
    {type: 'oucome', label: 'Расход'}
  ];

  closeFiter() {
    this.selectedCategories=[];
    this.selectedTypes=[];
    this.selectedPeriod='d';
    this.onFilterCancel.emit();
  }

  private calculateInputParams(field: string, checked: boolean, value: string) {
    if (checked) {
      this[field].indexOf(value) === -1 ? this[field].push(value): null;
    } else {
      this[field] = this[field].filter(i => i!== value);
    }
  }

  handleChangeType({checked, value}) {
    this.calculateInputParams('selectedTypes' ,checked, value);

  }

  handleChangeCategory({checked, value}) {
    this.calculateInputParams('selectedCategories' ,checked, value);
  }

  ApplyFiter() {
    this.onFilterApply.emit({
      types: this.selectedTypes,
      categories: this.selectedCategories,
      period: this.selectedPeriod
    })
  }

}
