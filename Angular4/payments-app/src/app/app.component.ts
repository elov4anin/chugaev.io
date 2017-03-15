import { Component, OnInit, Input } from '@angular/core';
import { SignService, User, } from './sign.service'

/*export class Item {
  id: number;
  date: any;
  payer: string;
  contractor: string;
  purpose: string;
  sum: number;
  state: string;

  constructor(payer: string, contractor: string, purpose: string, sum: number) {

    this.id = 6;
    this.date = new Date();
    this.payer = payer;
    this.contractor = contractor;
    this.purpose = purpose;
    this.sum = sum;
    this.state = "Новый";
  }
}*/

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  users: User[];
  submitted: boolean = false;
  isPaymets: boolean = true;
  usr: string;
  pass: string;

  constructor (private  signService: SignService) {}

  ngOnInit() {
    this.users = this.signService.getUsers();
  }

  onSubmit() {
    for (let i = 0; i< this.users.length; i++) {
      if ((this.users[i].username == this.usr) && (this.users[i].pass == this.pass)) {
        console.log('Имя и пароль совпадают');
        this.submitted = true;
        this.isPaymets = true;
      }
    }

  }
}
