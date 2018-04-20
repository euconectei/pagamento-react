import React from 'react';
// import './product.css';

const ProductItem = (props) => {
  return <div className= "product-item">
    <div className="product-item-quantity">{ props.product.quantity }</div>
    <div className = "product-item-name">{ props.product.name }</div >
    <div className="product-item-price">R$ { props.product.price }</div>
  </div>;
};

export {
  ProductItem,
};