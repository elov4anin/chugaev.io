import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {BaseApi} from "../../shared/base-api";
import {Observable} from "rxjs/Observable";
import {IVirtualMachines} from "../../sync-interfaces/virtual-machines";
import IVirtualMachine = IVirtualMachines.IVirtualMachine;

/*
  Generated class for the VmsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class VmsProvider extends BaseApi{

    body:string="";

    constructor (public http: HttpClient) {
        super(http);
    }

    getVms(): Observable<IVirtualMachine[]> {
        return this.post('virtual-machines/get', this.body);
    }

    addVm(vm: IVirtualMachine):Observable<IVirtualMachine> {
        return this.post('virtual-machines/create', vm);
    }

    getVmById(id:number): Observable<IVirtualMachine> {
        return this.post(`virtual-machines/${id}`);
    }

    updateVm(vm: IVirtualMachine): Observable<IVirtualMachine> {
        return this.post(`virtual-machines/update`, vm);
    }

    delVm(vm: IVirtualMachine): Observable<IVirtualMachine> {
        return this.post(`virtual-machines/delete`, vm);
    }

}
