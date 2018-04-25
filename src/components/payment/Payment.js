import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { ProductItem } from '../product/';
import { FormatCurrency } from '../format';

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

    this.serviceTax = 0;
    this.subtotal = 0;
    this.total = 0;

    this.table = props.match.params.table;
    this.handleServiceToggle = this.handleServiceToggle.bind(this);

  }

  componentWillMount() {
    const url = `https://condo-4748a.firebaseio.com/stone/tables/${ this.table }.json`;
    fetch(url)
      .then(
        (data) => data.json(),
        (err) => console.log(err)
      )
      .then(
        (table) => this.setState(() => ({ table })),
        (err) => console.log(err)
      );
  };

  handleServiceToggle() {
    this.setState((state) => {
      state.table.service = !state.table.service;
      return state;
    });
  };

  render() {
    let productItem = [];
    this.subtotal = 0;

    productItem = this.state.table.products.map(
      (product, i) => {
        this.subtotal += product.quantity * product.price;
        return <ProductItem key={ i } product={ product } />;
      }
    );

    this.serviceTax = this.subtotal * .1;
    this.total = this.subtotal;

    if (this.state.table.service) {
      this.total = this.subtotal + this.serviceTax;
    } else {
      this.total = this.subtotal;
    }

    return <div className="page payment">
      <h2>Histórico de Consumo</h2>
      <div className="payment-list">
        { productItem }
      </div>
      <div className="payment-service">
        <div className="payment-service-check">
          <input type="checkbox" defaultChecked={this.state.table.service} onChange={this.handleServiceToggle} />
        </div>
        <div className="payment-service-label">Serviço</div>
        <div className="payment-service-price"><FormatCurrency value={ this.serviceTax } /></div>
      </div>
      <div className="payment-total">
        <div className="payment-total-label">Total</div>
        <div className="payment-total-price"><FormatCurrency value={ this.total } /></div>
      </div>
      <Link className="btn" to={{
        pathname: `/payment/${ this.table }/divide`,
        state: {
          table: this.table,
          total: this.total,
        }
      }}>Pagar</Link>
    </div>;
  }
};

export {
  Payment,
};