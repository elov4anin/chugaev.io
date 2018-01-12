import {Component, OnInit, Input, OnDestroy} from '@angular/core';
import {Category} from "../../shared/models/category.model";
import {NgForm} from "@angular/forms";
import {WFMEvent} from "../../shared/models/event.model";
import * as moment from "moment";
import {EventService} from "../../shared/services/events.service";
import {BillService} from "../../shared/services/bill.service";
import {Bill} from "../../shared/models/bill.model";
import {Message} from "../../../shared/models/message.model";
import {Subscription} from "rxjs";


@Component({
  selector: 'wfm-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit, OnDestroy {

  subs1: Subscription;
  subs2: Subscription;

  @Input() categories: Category[] =[];
  types =[
    {type: 'income', label: 'Доход'},
    {type: 'outcome', label: 'Расход'}
  ];

  message: Message;

  constructor(private eventService:EventService, private billService:BillService) { }

  ngOnInit() {
    this.message = new Message('danger', '');
  }
  private showMessage (type:string, text: string) {
    this.message.type = type;
    this.message.text = text;
    window.setTimeout(()=> this.message.text="", 5000)
  }

  onSubmit(form: NgForm) {
    let {amount, description, category, type} = form.value;
    if (amount< 0) {
      amount *=-1;
    }

    const event = new WFMEvent(type, amount, +category, moment().format('DD.MM.YYYY HH:mm:ss'), description);

    this.subs1 = this.billService.getBill()
        .subscribe((bill: Bill) => {
            let value = 0;
            if (type === 'outcome') {
              if (amount > bill.value) {
                //error
                this.showMessage('danger', `На счету не достаточно средств. Вым не хватает ${amount - bill.value}`);
                return;
              } else {
                value = bill.value - amount;
              }

            } else {
              value = bill.value + amount;
            }

            this.subs2 = this.billService.updateBill({value, currency: bill.currency})
                .mergeMap(()=> this.eventService.addEvent(event))
                .subscribe(()=> {
                    this.showMessage('success', `Транзация успешно добавлена`);
                    form.setValue({
                      amount: 0,
                      desc: ' ',
                      category: 1,
                      type: 'outcome'

                    })
                });



        });


  }
  ngOnDestroy() {
    if (this.subs1) this.subs1.unsubscribe();
    if (this.subs2) this.subs2.unsubscribe();

  }

}
