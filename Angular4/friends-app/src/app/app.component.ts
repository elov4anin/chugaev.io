import { Component } from '@angular/core';
import {VkService} from "./vk.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  friends:Friend[];
  access_token: any;

  constructor (private vkService:VkService) {}


  ngOnInit() {
    this.vkService.authVK();
    this.vkService.getUsers().subscribe(friends => {

      this.friends = friends;
      console.log(this.friends[0]);
    })
  }

  postOnWall(owner_id: number) {
    console.log('(owner_id', owner_id);
    this.vkService.postOnWall(owner_id);
  }

}
class Friend {
  user_id: number;
  first_name: string;
  last_name: string;
  domain: string;
  city: string;
  bdate: string;
  photo_50: string;
  has_mobile: string;

}
