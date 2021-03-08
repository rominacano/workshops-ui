import axios from 'axios';
import { CUSTOMERS_PATH } from 'src/constants';

const getAllCustomers = async () => {
  return await axios.get(`${CUSTOMERS_PATH}`);
};

const getCustomerById = async customerId => {
  return await axios.get(`${CUSTOMERS_PATH}/${customerId}`);
};

const createCustomer = async customer => {
  return await axios.post(CUSTOMERS_PATH, customer);
};

const getCarsByCustomerId = async customerId => {
  return await axios.get(`${CUSTOMERS_PATH}/${customerId}/cars`);
};

export {
  getAllCustomers,
  getCustomerById,
  createCustomer,
  getCarsByCustomerId
};
