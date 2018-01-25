import * as React from 'react';
import './App.css';
const Router = require('react-router-dom').BrowserRouter;
const Route = require('react-router-dom').Route;
const Switch = require('react-router-dom').Switch;
import Header from '../header/header';
import Menu from '../menu/menu';
import List from '../list/list';
import RecordBase from '../record-base/record-base';
import Charts from '../charts/charts';

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
          <Router>
            <div>
              <Menu />
              <Header />
              <Switch>
                  <Route exact="true" path="/" component={List} />
                  <Route path="/base" component={RecordBase} />
                  <Route path="/charts" component={Charts} />
              </Switch>
            </div>
          </Router>
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
