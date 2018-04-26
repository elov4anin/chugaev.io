/**
 * Created by user on 10/19/17.
 */
const My = require ("../js/script");
/*import {My} from "../js/script";*/
describe('classMy.', function () {
    let my = new My(1);
    my.addItem(3);
    it('should pass', function () {
	expect(my.item).toBe(4);
    });

});