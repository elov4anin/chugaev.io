import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './components/app/App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import { Menu } from './components/menu/menu';
/*import {Charts} from './App';*/
ReactDOM.render(
  <App />,
  document.getElementById('root') as HTMLElement
);
ReactDOM.render(
    <Menu />,
    document.getElementById('menu') as HTMLElement
);
/*ReactDOM.render(
    <Charts />,
    document.getElementById('charts') as HTMLElement
);*/
registerServiceWorker();
