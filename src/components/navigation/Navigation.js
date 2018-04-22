import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import {
  Payment,
  PaymentDivide,
  PaymentDone,
  TableSelect,
} from '../';
import { routes } from '../../config/';
import './navigation.css';

const Navigation = () => {
  return <Router>
    <div>
      <nav className="menu">
        <ul>
          { Object.keys(routes).map((route, i) => <li key={i}><Link to={ routes[i].path }>{ routes[i].name }</Link></li>)}
        </ul>
      </nav>
      <main className="content">
        <Route exact path="/payment" render={(props) => <TableSelect {...props} tables={ this.state.tables } />} />
        <Route exact path="/payment/:table" render={(props) => <Payment {...props} tables={ this.state.tables } />} />
        <Route exact path="/payment/:table/divide" render={(props) => <PaymentDivide {...props} tables={ this.state.tables } />} />
        <Route exact path="/payment/:table/done" render={(props) => <PaymentDone {...props} tables={ this.state.tables } />} />
      </main>
    </div>
  </Router>;
};

export {
  Navigation,
};