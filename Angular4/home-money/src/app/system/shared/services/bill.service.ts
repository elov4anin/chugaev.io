import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {Bill} from "../models/bill.model";


@Injectable()
export class BillService {
    constructor (private http: HttpClient) {

    }
    getBill(): Observable<any> {
        return this.http.get('http://localhost:3000/bill');

    }
    getCurrency(base:string ='RUB'): Observable<any> {
        return this.http.get(`http://api.fixer.io/latest?base=${base}`);
    }

}