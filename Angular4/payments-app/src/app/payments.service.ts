import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import { Observable} from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

export class Item {
    id: number;
    date: any;
    payer: string;
    contractor: string;
    purpose: string;
    sum: number;
    state: string;

    /*constructor(payer: string, contractor: string, purpose: string, sum: number) {

        this.id = 6;
        this.date = new Date();
        this.payer = payer;
        this.contractor = contractor;
        this.purpose = purpose;
        this.sum = sum;
        this.state = "Новый";
    }*/
}

@Injectable()
export class PaymentsService {
  items: Item[] = [];

    constructor(private http: Http) { }

    getPayments(): Observable<Item[]> {

        return this.http.get('http://localhost:3333/items')
            .map(res => res.json() as Item[])
            .catch(this.handleErrror);

    }

    private handleErrror(error: any) {
        console.log('Ошибка', error);
        return Observable.throw(error.message || error);
    }


}
