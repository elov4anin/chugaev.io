import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import { Observable} from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

export class User {
  username: string;
  pass: string;
  tokenKey: string;

  constructor (username: string, pass: string, tokenKey: string) {
    this.username = username;
    this.pass = pass;
    this.tokenKey = tokenKey;
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

  users: User[]= [];

  constructor(private http: Http) { }

  getUsers(): Observable<User[]> {

    return this.http.get('http://localhost:3333/users')
        .map(res => res.json() as User[])
        .catch(this.handleErrror);

  }

  private handleErrror(error: any) {
    console.log('Ошибка', error);
    return Observable.throw(error.message || error);
  }

}
