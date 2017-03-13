import { Component, OnInit } from '@angular/core';
import { SignService, User } from '../sign.service'

@Component({
  moduleId: module.id,
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.css']
})

export class SignComponent implements OnInit {
  users: User[];
  constructor (private  signService: SignService) {}

  ngOnInit() {
    /*this.users = this.signService.getUsers();*/
  }


  submitted: boolean = false;

  onSubmit() {
    this.submitted = true;
    console.log(this.submitted);
  }


}
