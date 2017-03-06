import { Component, OnInit } from '@angular/core';
export class user {
  username: string;
  pass: string;
  tokenKey: string;

  constructor (username: string, pass: string, tokenKey: string) {
    this.username = username;
    this.pass = pass;
    this.tokenKey = tokenKey;
  }
}
@Component({
  moduleId: module.id,
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.css']
})

export class SignComponent implements OnInit {





  ngOnInit() {
  }

}
