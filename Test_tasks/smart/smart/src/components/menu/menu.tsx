import * as React from 'react';
import './menu.css';
interface MyProps {}
interface MyState {}
const Link = require('react-router-dom').Link;

class Menu extends React.Component<MyProps, MyState> {
    render() {
      return (
        <nav className="menu">
          <Link exact="true" to="/" activeClassName="active">БД</Link>
          <Link to="/base" activeClassName="active">О сайте</Link>
          <Link to="/charts" activeClassName="active">Графики</Link>
        </nav>
      );
    }
}
export default Menu;