/*
import action from './js/common/action';
import app from './js/common/app';

import $ from 'jquery';
import _ from 'lodash';

$('body').html('tello');
_.time();

console.log('test');
app();
action();

*/

interface Person {
  name: string;
  age: string
}

class User implements Person {
  name: string;
  age: string;

  constructor() {
    this.name = 'Ivan';
    this.age = '18';
  }

  private logInfo() {
    console.log(this.name + ' ' + this.age);
  }

}
