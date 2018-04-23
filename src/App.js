import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import {
  Payment,
  PaymentDivide,
  PaymentDone,
  TableSelect,
} from './components';
import { routes } from './config/';
import './App.css';

// <Redirect to="/payment" />
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tables: []
    };
  }
  
  componentWillMount() {
    fetch('https://condo-4748a.firebaseio.com/stone/tables.json')
      .then(
        (res) => res.json(),
        (err) => console.log(err)
      )
      .then(
        (tables) => this.setState(() => ({ tables })),
        (err) => console.log(err)
      );
  }
  
  render() {
    return (
      <Router>
        <div>
          <nav className="menu">
            <ul>
              { routes.map(
                  (route, i) => <li key={i}><Link to={ route.path }>{ route.name }</Link></li>
              )}
            </ul>
          </nav>
          <main className="content">
            <Route exact path="/" render={(props) => <TableSelect tables={ this.state.tables } />} />
            <Route exact path="/payment" render={(props) => <TableSelect {...props} tables={ this.state.tables } />} />
            <Route exact path="/payment/:table" render={(props) => <Payment {...props} tables={ this.state.tables } />} />
            <Route exact path="/payment/:table/divide" render={(props) => <PaymentDivide {...props} tables={ this.state.tables } />} />
            <Route exact path="/payment/:table/done" render={(props) => <PaymentDone {...props} tables={ this.state.tables } />} />
          </main>
        </div>
      </Router>
    );
  }
}

export default App;
