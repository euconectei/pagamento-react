import React from 'react';
import { FormatCurrency } from '../format';
// import './product.css';

const ProductItem = (props) => {
  console.log(props);
  return <div className= "product-item">
    <div className="product-item-quantity">{ props.product.quantity }</div>
    <div className = "product-item-name">{ props.product.name }</div >
    <div className="product-item-price"><FormatCurrency value={ props.product.price } /></div>
  </div>;
};

export {
  ProductItem,
};