import axios from '../axios';
const token = localStorage.getItem('token');
const config = {
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
};
export class ProductServices {
  static getProducts(
    keyword = '',
    pageNumber = '',
    sortBy = 'Newest',
    category = '',
  ) {
    let dataURL = `/product?keyword=${keyword}&pageNumber=${pageNumber}&sortBy=${sortBy}&category=${category}`;
    return axios.get(dataURL);
  }
  static getProduct(id) {
    let dataURL = `/product/${id}`;
    return axios.get(dataURL);
  }
  static getTopProduct() {
    let dataURL = `/product/top-rated`;
    return axios.get(dataURL);
  }
  static updateProduct(id, product) {
    let dataURL = `/product/${id}`;
    return axios.put(dataURL, product, config);
  }
  static addProduct(product) {
    let dataURL = `/product`;
    const data = axios.post(dataURL, product, config);
    return data;
  }
  static deleteProduct(id) {
    let dataURL = `/product/${id}`;
    return axios.delete(dataURL, config);
  }
  static addReview(id, reviews) {
    let dataURL = `/product/${id}/reviews`;
    return axios.post(dataURL, reviews, config);
  }
}
