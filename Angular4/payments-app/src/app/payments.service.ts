import { Injectable } from '@angular/core';

export class Item {
    id: number;
    date: any;
    payer: string;
    contractor: string;
    purpose: string;
    sum: number;
    state: string;

    constructor(payer: string, contractor: string, purpose: string, sum: number) {

        this.id = 6;
        this.date = new Date();
        this.payer = payer;
        this.contractor = contractor;
        this.purpose = purpose;
        this.sum = sum;
        this.state = "Новый";
    }
}

@Injectable()
export class PaymentsService {
  items: Item[] =
      [
        {id: 1, date: '05/12/2013', payer: 'Иванов И. И.', contractor: 'ООО ЖКХ', purpose: 'За КУ', sum: 400, state: 'Отправлен в банк'},
        {id: 2, date: '05/12/2013', payer: 'Сидоров И. И.', contractor: 'ООО ЖКХ', purpose: 'За КУ', sum: 400, state: 'Новый'},
        {id: 3, date: '05/12/2014', payer: 'Петров И. И.', contractor: 'ООО ЖКХ', purpose: 'За КУ', sum: 400, state: 'В обработке'},
        {id: 4, date: '05/12/2016', payer: 'ИП Медведев Д. А..', contractor: 'ООО ЖКХ', purpose: 'За КУ', sum: 400, state: 'Отклонено банком'},
        {id: 5, date: '05/12/2013', payer: 'ООО Яндекс.', contractor: 'ООО ЖКХ', purpose: 'За КУ', sum: 400, state: 'Отправлен в банк'},
        {id: 6, date: '05/12/2013', payer: 'Иванов И. И.', contractor: 'ООО ЖКХ', purpose: 'За КУ', sum: 400, state: 'Отправлен в банк'},
        {id: 7, date: '05/12/2013', payer: 'Сидоров И. И.', contractor: 'ООО ЖКХ', purpose: 'За КУ', sum: 400, state: 'Новый'},
        {id: 8, date: '05/12/2014', payer: 'Петров И. И.', contractor: 'ООО ЖКХ', purpose: 'За КУ', sum: 400, state: 'В обработке'},
        {id: 9, date: '05/12/2016', payer: 'ИП Медведев Д. А..', contractor: 'ООО ЖКХ', purpose: 'За КУ', sum: 400, state: 'Отклонено банком'},
        {id: 10, date: '05/12/2013', payer: 'ООО Яндекс.', contractor: 'ООО ЖКХ', purpose: 'За КУ', sum: 400, state: 'Отправлен в банк'},
        {id: 11, date: '05/12/2013', payer: 'Иванов И. И.', contractor: 'ООО ЖКХ', purpose: 'За КУ', sum: 400, state: 'Отправлен в банк'},
        {id: 12, date: '05/12/2013', payer: 'Сидоров И. И.', contractor: 'ООО ЖКХ', purpose: 'За КУ', sum: 400, state: 'Новый'},
        {id: 13, date: '05/12/2014', payer: 'Петров И. И.', contractor: 'ООО ЖКХ', purpose: 'За КУ', sum: 400, state: 'В обработке'},
        {id: 14, date: '05/12/2016', payer: 'ИП Медведев Д. А..', contractor: 'ООО ЖКХ', purpose: 'За КУ', sum: 400, state: 'Отклонено банком'},
        {id: 15, date: '05/12/2013', payer: 'ООО Яндекс.', contractor: 'ООО ЖКХ', purpose: 'За КУ', sum: 400, state: 'Отправлен в банк'}
      ];
  getPayments(): Item[] {
    return this.items;

  }


  constructor() { }
}
