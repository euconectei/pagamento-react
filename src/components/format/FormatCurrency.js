import React from 'react';

const FormatCurrency = (props) => {
  return <span className="number-currency">R$ { props.value.toFixed(2).replace(/[,.]/g, (m) => m === ',' ? '.' : ',') }</span>;
};

export {
  FormatCurrency,
};