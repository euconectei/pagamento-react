import React from 'react';

const FormatCurrency = (props) => {
  console.log(props.value);
  return <span className="number-currency">R$ { props.value.toFixed(2).replace(/[,.]/g, (m) => m === ',' ? '.' : ',') }</span>;
};

export {
  FormatCurrency,
};