import * as React from 'react';
import './header.css';
const logo = require('../../logo.svg');
interface MyProps {}
interface MyState {}

class Header extends React.Component<MyProps, MyState> {
  render() {
    return (
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
  );

  }
}

export default Header;