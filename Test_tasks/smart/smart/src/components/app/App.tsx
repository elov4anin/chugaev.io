import * as React from 'react';
import './App.css';
const Router = require('react-router-dom').BrowserRouter;
const Route = require('react-router-dom').Route;
const Switch = require('react-router-dom').Switch;
import Header from '../header/header';
import Menu from '../menu/menu';
import List from '../list/list';
import RecordBase from '../record-base/record-base';

/*const ReactHighcharts = require('react-highcharts');*/

interface MyProps {}
interface MyState {}
/*
const config = {
  /!* HighchartsConfig *!/
};*/

class App extends React.Component<MyProps, MyState> {
  render() {
    return (
      <div className="App">
        <Menu />
        <Header />
          <Router>
              <Switch>
                  <Route path="/" component={List} />
                  <Route path="/base" component={RecordBase} />
              </Switch>
          </Router>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
        <List />

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
