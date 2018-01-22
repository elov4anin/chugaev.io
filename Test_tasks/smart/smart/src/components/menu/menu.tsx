import * as React from 'react';
import './menu.css';
interface MyProps {}
interface MyState {}

class Menu extends React.Component<MyProps, MyState> {
    render() {
        return (
            <ul className="menu">
                <li>
                    <a href="">БД</a>
                </li>
                <li>
                    <a href="">График</a>
                </li>
                <li>
                    <a href="">Запись</a>
                </li>
            </ul>
        );
    }
}

export default Menu;