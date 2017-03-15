import { Injectable } from '@angular/core';
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

  users: User[] =
      [
        {username: 'Admin',  pass: '1', tokenKey: '123'},
        {username: 'root',  pass: 'root', tokenKey: '123'}
      ];
  getUsers(): User[] {
    return this.users;
  }

  constructor() { }

}
