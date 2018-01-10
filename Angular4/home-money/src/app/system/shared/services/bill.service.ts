import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {Bill} from "../models/bill.model";
import {BaseApi} from "../../../shared/core/base-api";


@Injectable()
export class BillService extends BaseApi{
    constructor (public http: HttpClient) {
        super(http);

    }

    getBill(): Observable<any> {
        return this.get('bill')
    }
    getCurrency(base:string ='RUB'):Observable<any> {
        return this.http.get(`http://api.fixer.io/latest?base=${base}`);
    }

    updateBill(bill: Bill):Observable<Bill> {
        return this.put('bill', bill);
    }

}