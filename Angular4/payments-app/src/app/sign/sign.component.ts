import { Component, OnInit, Input } from '@angular/core';
import { SignService, User, } from '../sign.service'


@Component({
  moduleId: module.id,
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.css']
})

export class SignComponent implements OnInit {
  users: User[];
  submitted: boolean = false;
  usr: string;
  pass: string;
  @Input() paySubmitted;

  constructor (private  signService: SignService) {}

  ngOnInit() {
    this.users = this.signService.getUsers();
  }

  onSubmit() {
    if ((this.users[1].username == this.usr) && (this.users[1].pass == this.pass)) {
      console.log('Имя и пароль совпадают');
      this.submitted = true;
      this.paySubmitted = false;
    }


  }
}
