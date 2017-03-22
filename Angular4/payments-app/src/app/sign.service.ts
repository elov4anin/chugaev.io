import {Injectable, Input} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import { Observable} from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {tokenKey} from "@angular/core/src/view/util";

export class User {
  username: string;
  pass: string;

  constructor (username: string, pass: string) {
    this.username = username;
    this.pass = pass;

  }
}

@Injectable()
export class SignService {
/*
  users: User[] =
      [
        {username: 'Admin',  pass: '1', tokenKey: '123'},
        {username: 'root',  pass: 'root', tokenKey: '123'}
      ];
  getUsers(): User[] {
    return this.users;
  }
  */

  token: any;
  users: User[]= [];

  constructor(private http: Http) { }

  getUsers(): Observable<User[]> {

    return this.http.get('http://10.10.118.146:8080/admin/rs/api/login?login=any&password=any')
        .map(res => console.log(res.json()))
        .catch(this.handleErrror);

  }
  sendUser(user: string, pass: string) {
    console.log("SendUser");
    let headers = new Headers({'Content-Type': 'application/json'});

    let options = new RequestOptions({ headers})
    console.log('sendUser servuce');
    return this.http.get(`http://10.10.118.146:8080/admin/rs/api/login?login=${user}&password=${pass}`)
        .map(res => res.json())
        .catch(this.handleErrror);

  }

  createAuthorizationHeader(headers:Headers) {
    headers.append('Authorization', 'Bearer ' + localStorage.getItem('tokenKey'));
    //Вместо localStorage можно использовать сервис авторизации, с методом, который возвращает токен
  }

  get(url) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.get(url, {
      headers: headers
    });
  }
  post(url, obj) {
    let headers = new Headers();
    let data = JSON.stringify(obj);
    this.createAuthorizationHeader(headers);
    return this.http.post(url, data, {
      headers: headers
    });
  }


  private handleErrror(error: any) {
    console.log('Ошибка', error);
    return Observable.throw(error.message || error);
  }

}
