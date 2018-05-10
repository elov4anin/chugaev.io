import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/Observable";


@Injectable()
export class BaseApi {

    private baseUrl = 'http://localhost:3002/';

    constructor(public http:HttpClient) {
    }

    private getUrl(url: string = ''): string {
        return this.baseUrl + url;
    }


    public get(url: string =''): Observable<any> {
        return this.http.get(this.getUrl(url));
    }

    public post(url: string ='', data: any = {}): Observable<any> {
        const myHeaders = new HttpHeaders().set('Authorization','Bearer ' + localStorage.getItem('token'));


        return this.http.post(this.getUrl(url) , data, {headers:myHeaders});
    }

    public put(url: string ='', data: any = {}): Observable<any> {
        return this.http.put(this.getUrl(url) , data);
    }

    public del(url: string ='', data: any = {}): Observable<any> {
        return this.http.delete(this.getUrl(url) , data);
    }

    public getToken(url: string ='', data: any = {}): Observable<any> {
        return this.http.post(this.getUrl(url) , data);
    }

    public updateToken(url: string =''): Observable<any> {
        const myHeaders = new HttpHeaders().set('Authorization','Bearer ' + localStorage.getItem('token'));
        return this.http.post(this.getUrl(url) , "",{headers:myHeaders});
    }
}