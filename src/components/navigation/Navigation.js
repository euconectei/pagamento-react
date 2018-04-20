import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import {
  Payment,
  PaymentDivide,
  PaymentDone,
  TableSelect,
} from '../';
import { routes } from '../../config/'

const Navigation = () => {
  return <Router>
    <div>
      <nav className="menu">
        <ul>
          { Object.keys(routes).map((route, i) => <li key={i}><Link to={ routes[i].path }>{ routes[i].name }</Link></li>)}
        </ul>
      </nav>
      <main className="content">
        <Route exact path="/" render={props => (<Payment tables={this.state.tables} {...props} />)}/>
        <Route exact path="/" render={props => (<PaymentDivide tables={this.state.tables} {...props} />)}/>
        <Route exact path="/" render={props => (<PaymentDone tables={this.state.tables} {...props} />)}/>
        <Route exact path="/" render={props => (<TableSelect tables={this.state.tables} {...props} />)}/>
        <Route exact path="/" render={props => (<TableSelect tables={this.state.tables} {...props} />)}/>
      </main>
    </div>
  </Router>;
};

export {
  Navigation,
};