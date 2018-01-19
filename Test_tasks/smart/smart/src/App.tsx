import * as React from 'react';
import './App.css';
import './fixture';
import products from './fixture';

const logo = require('./logo.svg');
/*const ReactHighcharts = require('react-highcharts');*/

interface MyProps {}
interface MyState {}
let prods = products;
/*
const config = {
  /!* HighchartsConfig *!/
};*/

class App extends React.Component<MyProps, MyState> {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
        <table>
          {
            prods.map((item, index) =>
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.feature1}</td>
                <td>{item.feature2}</td>
                <td>{item.year}</td>
              </tr>
          )}
        </table>
      </div>
    );
  }
}
/*
export class Charts extends React.Component<MyProps, MyState> {

  render() {
    return (<ReactHighcharts config = {config}></ReactHighcharts>);
  }
}*/

export default App;
