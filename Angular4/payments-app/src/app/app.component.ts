import { Component, OnInit, Input } from '@angular/core';
import { SignService, User, } from './sign.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  users: User[];
  submitted: boolean = false;
  isPaymets: boolean = false;
  errorSign: boolean = true;
  usr: string;
  pass: string;
  csrf: string;
/*  token: string = salt + ":" + MD5(salt + ":" + secret)*/
  constructor (private  signService: SignService) {}

  ngOnInit() {
  /*  this.users = this.signService.getUsers();*/
    this.signService.getUsers().subscribe(users => this.users = users );
  }

  onSubmit() {
    for (let i = 0; i< this.users.length; i++) {
      if ((this.users[i].username == this.usr) && (this.users[i].pass == this.pass)) {
        this.submitted = true;
        this.isPaymets = true;
      }
      else {
      this.errorSign = false;
      }
    }

  }
}
