import {Component, OnInit, Input, Output} from '@angular/core';
import { SignService, User, } from './sign.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



export class AppComponent implements OnInit {
  users: User[];
  seconds: Second[];
  submitted: boolean = false;
  isPaymets: boolean = true;
  errorSign: boolean = true;
  usr: string;
  pass: string;
  csrf: string;
  second: any;
  token: string; /*salt + ":" + MD5(salt + ":" + secret)*/
  tok: any;
  constructor (private signService : SignService) {}

  ngOnInit() {
  /*  this.users = this.signService.getUsers();*/
   /* this.signService.getUsers().subscribe(users => this.users = users );*/
  }
  onSubmit() {
    console.log(this.usr);
    this.signService.sendUser(this.usr, this.pass).subscribe(seconds => this.seconds = seconds);
    console.log(this.seconds);

  /*  if ((this.second.userToken)) {
      this.submitted = true;
      this.isPaymets = true;
    }
    else {
      this.errorSign = false;
    }*/
    /*for (let i = 0; i< this.users.length; i++) {
     if ((this.users[i].username == this.usr) && (this.users[i].pass == this.pass) && (this.users[i].tokenKey == this.token)) {}
    }*/

  }
}

export  class  Second {
  userId: number;
  token: string;
  bestBefore: number;
  userToken: string;

}