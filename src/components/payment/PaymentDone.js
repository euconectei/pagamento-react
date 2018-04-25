import React from 'react';
import { Link } from 'react-router-dom';

const PaymentDone = (props) => {
  return <div className="page">
    <h2>Conclusão de Pagamento</h2>
    <div className="grid-center">
      <div className="banner">Pagamento concluído com sucesso!</div>
    </div>
    <Link to="/" className="btn">Fechar</Link>

  </div>;
};

export {
  PaymentDone,
};