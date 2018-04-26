import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import {
  Payment,
  PaymentDivide,
  PaymentDone,
  TableSelect,
} from './components';
import './App.css';

class App extends Component {
  
  render() {
    return (
      <Router>
        <main className="content">
          <Route exact path="/" render={(props) => <TableSelect />} />
          <Route exact path="/payment" render={(props) => <TableSelect {...props} />} />
          <Route exact path="/payment/:table" render={(props) => <Payment {...props} />} />
          <Route exact path="/payment/:table/divide" render={(props) => <PaymentDivide {...props} />} />
          <Route exact path="/payment/:table/done" render={(props) => <PaymentDone {...props} />} />
        </main>
      </Router>
    );
  }
}

export default App;
