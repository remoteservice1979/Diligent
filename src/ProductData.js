import eggs from './images/eggs.jpg';
import milk from './images/milk.jpg';
import beans from './images/beans.png';
import peas from './images/peas.jpg';

export const ProductData = [
  {
    image: eggs,
    type: "dairy",
    name: "eggs",
    quantity: "dozen",
    price: 2.10
  },
  {
    image: milk,
    type: "dairy",
    name: "milk",
    quantity: "bottle",
    price: 1.30,
    currency: "USD"
  },
  {
    image: beans,
    type: "storecupboard",
    name: "beans",
    quantity: "can",
    price: 0.73,
    currency: "USD"
  },
  {
    image: peas,
    type: "frozen produce",
    name: "peas",
    quantity: "bag",
    price: 0.95,
    currency: "USD"
  }
]
