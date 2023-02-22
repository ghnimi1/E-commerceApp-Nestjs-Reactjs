import axios from '../axios';
const token = localStorage.getItem('token');
const config = {
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Bearer ${token}`,
  },
};
export class OrderServices {
  static getOrders() {
    let dataURL = `/order`;
    return axios.get(dataURL, config);
  }
  static getOrder(id) {
    let dataURL = `/order/${id}`;
    return axios.get(dataURL, config);
  }

  static addOrder(order) {
    let dataURL = `/order`;
    const data = axios.post(dataURL, order, config);
    return data;
  }
  static paidOrder(id) {
    let dataURL = `/order/${id}/paid`;
    return axios.get(dataURL, config);
  }
  static OrderDelivered(id) {
    let dataURL = `/order/${id}/delivered`;
    return axios.get(dataURL, config);
  }
  static deleteOrder(id) {
    let dataURL = `/order/${id}`;
    return axios.delete(dataURL, config);
  }
}
