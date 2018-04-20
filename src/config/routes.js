import {
  Payment,
  PaymentDivide,
  PaymentDone,
  TableSelect,
} from '../components/';

const routes = [
  {
    name: "Mesa",
    path: "/",
    component: TableSelect,
  },
  {
    name: "Mesa",
    path: "/payment",
    component: TableSelect,
  },
  {
    name: "Pedidos",
    path: "/payment/14",
    component: Payment,
  },
  {
    name: "Dividir",
    path: "/payment/14/divide",
    component: PaymentDivide,
  },
  {
    name: "Concluído",
    path: "/payment/14/done",
    component: PaymentDone,
  },
];

export {
  routes,
};