import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FormatCurrency } from '../format';

class PaymentDivide extends Component {
  constructor(props) {
    super(props);

    this.state = {
      paymentDone: false,
      paidRemaining: this.props.history.location.state.total,
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
    let valuePerCard = (this.state.total / quantity).toFixed(2);
    for (let i = 0; i < quantity; i++) {
      this.paid.push({value: valuePerCard, done: false});
      this.cards.push(<div key={i} className="payment-card">
          <div className="payment-card-input">
            <input id={`payment-card-value-${i}`} className="payment-card-value" type="number" defaultValue={valuePerCard} />
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
    let paidRemaining = 0;
    if (this.paid[target].done) {
      this.paid[target].done = false;
      document.querySelector(`#payment-card-value-${target}`).removeAttribute('readonly');
    } else {
      this.paid[target].done = true;
      document.querySelector(`#payment-card-value-${target}`).setAttribute('readonly', true);
    }
    let paymentDone = this.paid.map((elem) => (elem.done === false) ? elem.value : 0);
    paidRemaining = paymentDone.reduce((acc, cur, i) => parseFloat(acc) + parseFloat(cur));
    this.setState({
      paidRemaining: paidRemaining,
    });
  }

  render() {
    const link = (this.state.paidRemaining !== 0) ? (
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
      <div className={`payment-divide-remaining ${(this.state.paidRemaining === 0) ? "payment-done" : ""}`}>Restante: <FormatCurrency value={ this.state.paidRemaining } /></div>
      <div className="payment-divide-total">Total: <FormatCurrency value={this.state.total} /></div>
    </div>);
  };

}

export {
  PaymentDivide,
};