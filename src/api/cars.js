import axios from 'axios';
import { CARS_PATH } from 'src/constants';

const createCar = async car => {
  return await axios.post(CARS_PATH, car);
};

const getOrdersByCar = async carId => {
  return await axios.get(`${CARS_PATH}/${carId}/repairs`);
};

export { createCar, getOrdersByCar };
