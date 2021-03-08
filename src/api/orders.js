import axios from 'axios';
import { ORDERS_PATH } from 'src/constants';

const getAllOrders = async () => {
  return await axios.get(`${ORDERS_PATH}`);
};

const createOrder = async order => {
  return await axios.post(ORDERS_PATH, order);
};

export { getAllOrders, createOrder };
