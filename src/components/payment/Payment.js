import React, { Component } from 'react';
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

    this.table = props.match.params.table;
    this.handleServiceToggle = this.handleServiceToggle.bind(this);
    this.handlePaymentDivide = this.handlePaymentDivide.bind(this);

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

  handlePaymentDivide() {
    let quantity = prompt('Dividir a conta em quantos cartões?', 1);
    if (!isNaN(quantity) && quantity > 0) {
      window.location = `/payment/${ this.table }/divide/${ quantity }`;
    } else {
      alert(`Verifique a quantidade digitada: '${quantity}'.`)
    }
  }

  render() {
    let total = 0;
    let service = 0;

    return <div>
      <h2>Histórico de Consumo</h2>
      <div className="payment-list">
        {this.state.table.products.map(
          (product, i) => {
            total += product.quantity * product.price;
            return <ProductItem key={ i } product={ product } />;
          }
        )}
        <div className="payment-service">
          <div className="payment-service-check">
            <input type="checkbox" defaultChecked={this.state.table.service} onChange={this.handleServiceToggle} />
          </div>
          <div className="payment-service-label">Serviço</div>
          <div className="payment-service-price"><FormatCurrency value={ service = total * .1 } /></div>
        </div>
        <div className="payment-total">
          <div className="payment-total-label">Total</div>
          <div className="payment-total-price"><FormatCurrency value={ (this.state.table.service) ? total + service : total } /></div>
        </div>
        <div className="action-buttons">
          <input type="button" value="Dividir entre cartões" onClick={ this.handlePaymentDivide } />
          <input type="button" value="Pagar" onClick={ this.handlePaymentDivide } />
        </div>
      </div>
    </div>;
  }
};

export {
  Payment,
};