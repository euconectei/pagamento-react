import {
  Payment,
  PaymentDivide,
  PaymentDone,
  TableSelect,
} from '../components/';

const routes = [
  {
    name: "Mesa",
    path: "/pagamento-react/",
    component: TableSelect,
  },
  {
    name: "Mesa",
    path: "/pagamento-react/payment",
    component: TableSelect,
  },
  {
    name: "Pedidos",
    path: "/pagamento-react/payment/14",
    component: Payment,
  },
  {
    name: "Dividir",
    path: "/pagamento-react/payment/14/divide",
    component: PaymentDivide,
  },
  {
    name: "Concluído",
    path: "/pagamento-react/payment/14/done",
    component: PaymentDone,
  },
];

export {
  routes,
};