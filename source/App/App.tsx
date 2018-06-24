import * as React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';

import {MainWrapper} from 'common-components/MainWrapper/MainWrapper';

import {sidebarStore} from 'stores/SidebarStore';

import './App-styles/App.css';


export class App extends React.Component {
  public render() {
    return (
      <BrowserRouter>
        <Route path='/' component={MainWrapper} />
      </BrowserRouter>
    );
  }
}