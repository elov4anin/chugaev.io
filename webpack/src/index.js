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
var User = (function () {
    function User() {
        this.name = 'Ivan';
        this.age = '18';
    }
    User.prototype.logInfo = function () {
        console.log(this.name + ' ' + this.age);
    };
    return User;
}());
//# sourceMappingURL=index.js.map