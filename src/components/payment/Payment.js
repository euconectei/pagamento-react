import React, { Component } from 'react';
import { ProductItem } from '../product/';

import './payment.css';

class Payment extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      table: {
        done: false,
        products: [],
        service: false,
      },
    };
    
    this.table = props.match.params.table;
    this.handleServiceToggle = this.handleServiceToggle.bind(this);

  }
  
  componentWillMount() {
    const url = `https://condo-4748a.firebaseio.com/stone/table/${ this.table }.json`;
    console.log(url);
    fetch(url)
      .then(
        (data) => data.json(),
        (err) => console.log(err)
      )
      .then(
        (table) => this.setState(() => ({ table })),
        (err) => console.log(err)
      );
    console.log(this.state);
  }

  handleServiceToggle() {
    this.setState((state) => {
      state.table.service = !state.table.service;
      return state;
    });
  }

  render() {
    let total = 0;
    let service = 0;
    let totalWithService = 0;
    console.log(this.state);
    
    return <div className="payment-list">
      {this.state.table.products.map(
        (product, i) => {
          total += product.quantity * product.price;
          return <ProductItem key={ i } product={ product } />;
        }
      )}
      { service = total * .1 }
      { totalWithService = total + service }
      <div className="payment-service">
        <div className="payment-service-check">
          <input type="checkbox" defaultChecked={this.state.table.service} onChange={this.handleServiceToggle} />
        </div>
        <div className="payment-service-label">Serviço</div>
        <div className="payment-service-price">{ service }</div>
      </div>
      <div className="payment-total">
        <div className="payment-total-label">Total</div>
        <div className="payment-total-price">R$ { (this.state.table.service) ? totalWithService : total }</div>
      </div>
    </div>;
  }
};

export {
  Payment,
};