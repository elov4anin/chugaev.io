import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UsersService} from "../../shared/services/users.service";
import {User} from "../../shared/services/models/user.model";
import {Message} from "../../shared/services/models/message.model";
import {AuthService} from "../../shared/services/auth.service";
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
  selector: 'wfm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  message: Message;

  constructor(
      private usersService: UsersService,
      private authService: AuthService,
      private router: Router,
      private route:ActivatedRoute

  ) { }

  ngOnInit() {
    this.message = new Message("danger", "");
    this.route.queryParams.subscribe((params:Params) => {
        if (params['noCanLoggin']) {
            this.showMessage({
                text: 'Теперь Вы можете зайти в систему',
                type: 'success'
            });
        }
    });

    this.form = new FormGroup({
        'email': new FormControl(null, [Validators.required, Validators.email]),
        'password': new FormControl(null, [Validators.required, Validators.minLength(6)])
    })
  }

  private showMessage (message: Message) {
    this.message = message;
      window.setTimeout(()=> {
      this.message.text ="";
      }, 5000)
  }
  onSubmit() {
    const formData = this.form.value;

    this.usersService.getUserByEmail(formData.email)
        .subscribe((user:User) => {
      if (user) {
        if (user.password === formData.password) {
          this.message.text="";
          window.localStorage.setItem('user', JSON.stringify(user));
          this.authService.login();
          /*this.router.navigate([''])*/




        } else {
          this.showMessage({
              text:"invalid pass",
              type: "danger"
          });
        }
      } else {
          this.showMessage({
              text:"not user",
              type: "danger"
          });
      }
        })
  }
}
