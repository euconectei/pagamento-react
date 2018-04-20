import React from 'react';
import { ProductItem } from '../product/';

const Payment = ({ match }, props) => {
  let total = 0;
  let service = 0;
  let totalWithService = 0;
  console.log(match);
  return <div className="payment-list">
    {props.products.map(
      (product, i) => {
        total += product.quantity * product.price;
        return <ProductItem key={ i } product={ product } />;
      }
    )}
    { service = total * .1 }
    { totalWithService = total + service }
    <div className="payment-service">
      <div className="payment-service-check"><input type="checkbox" onClick="" /></div>
      <div className="payment-service-label">Serviço</div>
      <div className="payment-service-price">{ service }</div>
    </div>
    <div className="payment-total">
      <div className="payment-total-label">Total</div>
      <div className="payment-total-price">R$ { (false) ? total : totalWithService }</div>
    </div>
  </div>;
};

export {
  Payment,
};