import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FormatCurrency } from '../format';

class PaymentDivide extends Component {
  constructor(props) {
    super(props);

    this.state = {
      paymentDone: false,
      paidRemaining: 0,
      total: this.props.history.location.state.total,
    };
    this.cards = [];
    this.paid = [];
    this.table = props.match.params.table;

    this.onPayDone = this.onPayDone.bind(this);
  }

  componentWillMount() {
    let quantity = 0;
    while (!(quantity >= 1 && !isNaN(quantity))) { quantity = parseInt(prompt('Qual a quantidade de cartões?', 1), 10); }
    let valuePerCard = Math.floor(this.state.total / quantity * 100)/100;
    console.log(valuePerCard);
    console.log(this.state.total);
    for (let i = 0; i < quantity; i++) {
      this.paid.push({value: valuePerCard, done: false});
      this.cards.push(<div key={i} className="payment-card">
          <div className="payment-card-input">
            <input id={`payment-card-value-${i}`} className="payment-card-value" type="number" defaultValue={(i === quantity-1) ? (valuePerCard+(this.state.total%quantity)/100).toFixed(2) : (valuePerCard).toFixed(2)} data-target={i} pattern="\d*" />
          </div>
          <div className="payment-card-check">
            <label>
              <input type="checkbox" name="payment-card-check" id={`payment-card-check-${i}`} data-target={i} onChange={ this.onPayDone } /> Pago
            </label>
          </div>
        </div>);
    }
  }

  onPayDone(event) {
    const target = event.target.getAttribute('data-target');
    const valueElems = document.querySelectorAll('.payment-card-value');
    let values = [];

    valueElems.forEach((elem) => {
      values.push({
        done: document.querySelector(`#payment-card-check-${elem.dataset.target}`).checked,
        value: elem.value,
      });
      console.log(elem.value);
    });
    if (this.paid[target].done) {
      values[target].done = false;
      this.paid[target].done = false;
      document.querySelector(`#payment-card-value-${target}`).removeAttribute('readonly');
    } else {
      values[target].done = true;
      this.paid[target].done = true;
      document.querySelector(`#payment-card-value-${target}`).setAttribute('readonly', true);
    }

    let paidRemaining = 0;
    let paymentDone = values.map((elem) => (elem.done === true) ? elem.value : 0);
    paidRemaining = paymentDone.reduce((acc, cur, i) => parseFloat(acc) + parseFloat(cur));
    this.setState({
      paidRemaining: Math.floor(paidRemaining*100)/100,
    });
  }
  
  render() {
    console.log(this.state.paidRemaining);
    const link = (this.state.total !== this.state.paidRemaining) ? (
      <span className="btn">Concluir</span>
    ) : (
      <Link className="btn" to={{
        pathname: `/payment/${ this.table }/done`,
      }}>Concluir</Link>
    )
    return (<div className="page payment-divide">
      <h2>Pagamento</h2>
      <div className="cards-divide">
        {this.cards}
      </div>
      {link}
      <div className={`payment-divide-remaining ${(this.state.total === this.state.paidRemaining) ? "payment-done" : ""}`}>Restante: <FormatCurrency value={ this.state.total - this.state.paidRemaining } /></div>
      <div className="payment-divide-total">Total: <FormatCurrency value={this.state.total} /></div>
    </div>);
  };

}

export {
  PaymentDivide,
};