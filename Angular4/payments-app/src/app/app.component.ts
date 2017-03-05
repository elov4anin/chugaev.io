import { Component } from '@angular/core';

export class Item {
  id: number;
  date: string;
  payer: string;
  contractor: string;
  purpose: string;
  sum: number;
  state: string;

  constructor(id: number, payer: string, contractor: string, purpose: string, sum: number, state: string) {
    this.id = id;
    this.date = '15/15/2067';
    this.payer = payer;
    this.contractor = contractor;
    this.purpose = purpose;
    this.sum = sum;
    this.state = "new";
  }
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  items: Item[] =
      [
        {id: 1, date: '05/12/2013', payer: 'Иванов И. И.', contractor: 'ООО ЖКХ', purpose: 'За КУ', sum: 400, state: 'Отправлен в банк'},
        {id: 2, date: '05/12/2013', payer: 'Иванов И. И.', contractor: 'ООО ЖКХ', purpose: 'За КУ', sum: 400, state: 'Отправлен в банк'},
        {id: 3, date: '05/12/2013', payer: 'Иванов И. И.', contractor: 'ООО ЖКХ', purpose: 'За КУ', sum: 400, state: 'Отправлен в банк'},
        {id: 4, date: '05/12/2013', payer: 'Иванов И. И.', contractor: 'ООО ЖКХ', purpose: 'За КУ', sum: 400, state: 'Отправлен в банк'},
        {id: 5, date: '05/12/2013', payer: 'Иванов И. И.', contractor: 'ООО ЖКХ', purpose: 'За КУ', sum: 400, state: 'Отправлен в банк'}
      ];
  addItem(id: number, payer: string, contractor: string, purpose: string, sum: number, state: string):'' void {

    this.items.push(new Item(id, payer, contractor, purpose, sum,  state));
  }
}
