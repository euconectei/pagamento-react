import React, { Component } from 'react';
import { FormatCurrency } from '../format';

class PaymentDivide extends Component {
  constructor(props) {
    super(props);

    this.state = {
      paidTotal: this.props.history.location.state.total,
      paymentDone: false,
      total: this.props.history.location.state.total,
    };
    this.cards = [];
    this.paid = [];

    this.onChangeValue = this.onChangeValue.bind(this);
    this.onPayDone = this.onPayDone.bind(this);
  }

  componentWillMount() {
    let quantity = prompt('Qual a quantidade de cartões?', 1);
    let valuePerCard = (this.state.total / quantity).toFixed(2);
    for (let i = 0; i < quantity; i++) {
      this.paid.push({value: valuePerCard, done: false});
      this.cards.push(<div key={i} className="payment-card">
          <div className="payment-card-check">
            <input type="checkbox" name="payment-card-check" id={`payment-card-check-${i}`} data-target={i} onChange={ this.onPayDone } />
          </div>
          <div className="payment-card-input">
            <input id={`payment-card-value-${i}`} className="payment-card-value" type="number" defaultValue={valuePerCard} onChange={this.onChangeValue} />
          </div>
        </div>);
    }
  }

  onChangeValue() {
    const cardsValue = document.querySelectorAll('.payment-card-value');
    let paidValue = 0;
    for (let i = 0; i < cardsValue.length; i++) {
      const value = parseFloat(cardsValue[i].value);
      paidValue += value;
    }
    this.setState({paidTotal: paidValue});
  }

  onPayDone(event) {
    const target = event.target.getAttribute('data-target');
    if (this.paid[target].done) {
      this.paid[target].done = false;
      document.querySelector(`#payment-card-value-${target}`).removeAttribute('readonly');
    } else {      
      this.paid[target].done = true;
      document.querySelector(`#payment-card-value-${target}`).setAttribute('readonly', true);
    }
    let paymentDone = this.paid.filter((elem, pos, arr) => {
      if (elem.done === false) {
        return arr.indexOf(elem)
      }
      return false;
    });
    if (paymentDone.length === 0) {
      this.setState({ paymentDone: true });
    }
  }

  render() {
    return (<div className="page payment-divide">
      <h2>Pagamento</h2>
      <div className="cards-divide">
        {this.cards}
      </div>

      <div className="payment-divide-remaining"><FormatCurrency value={ this.state.total - this.state.paidTotal } /></div>
      <div className={`payment-divide-total ${(this.state.paymentDone) ? "payment-done" : ""}`}><FormatCurrency value={this.state.total} /></div>
    </div>);

  };

}

export {
  PaymentDivide,
};