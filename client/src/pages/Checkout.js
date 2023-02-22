import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addOrder } from '../redux/slices/orderSlice';

function Checkout(props) {
  const [info, setInfo] = useState(null);
  const [methodPayment, setMethodPayment] = useState('Paypal');
  const { cartItems } = useSelector((state) => state.cart);
  const { order, success } = useSelector((state) => state.orders);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onChangeHandler = (e) => {
    setInfo({
      ...info,
      [e.target.name]: e.target.value,
    });
  };
  //   Calculate prices
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  const itemsPrice = addDecimals(
    cartItems.reduce((acc, item) => acc + item.price * item.cartQuantity, 0),
  );
  const shippingPrice = addDecimals(itemsPrice > 150 ? 0 : 3);
  const totalPrice = (Number(itemsPrice) + Number(shippingPrice)).toFixed(2);
  const createOrder = () => {
    dispatch(
      addOrder({
        orderItems: cartItems,
        shippingAddress: info,
        paymentMethod: methodPayment,
        itemsPrice: itemsPrice,
        shippingPrice: shippingPrice,
        totalPrice: totalPrice,
      }),
    );
  };
  useEffect(() => {
    if (success) {
      localStorage.removeItem('cartItems');
      navigate(`/order/${order?._id}`);
    }
  }, [success]);
  return (
    <div className="container-fluid">
      <div className="row px-xl-5">
        <div className="col-lg-8">
          <h5 className="section-title position-relative text-uppercase mb-3">
            <span className="bg-secondary pr-3">Billing Address</span>
          </h5>
          <div className="bg-light p-30 mb-5">
            <div className="row">
              <div className="col-md-6 form-group">
                <label>Address</label>
                <input
                  className="form-control"
                  type="text"
                  onChange={onChangeHandler}
                  name="address"
                  placeholder="Your address.."
                />
              </div>
              <div className="col-md-6 form-group">
                <label>City</label>
                <input
                  className="form-control"
                  type="text"
                  onChange={onChangeHandler}
                  name="city"
                  placeholder="Your city.."
                />
              </div>
              <div className="col-md-6 form-group">
                <label>Postal Code</label>
                <input
                  className="form-control"
                  type="text"
                  onChange={onChangeHandler}
                  name="postalCode"
                  placeholder="Your postal code.."
                />
              </div>
              <div className="col-md-6 form-group">
                <label>Country</label>
                <input
                  className="form-control"
                  type="text"
                  onChange={onChangeHandler}
                  name="country"
                  placeholder="Your country.."
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="mb-5">
            <h5 className="section-title position-relative text-uppercase mb-3">
              <span className="bg-secondary pr-3">Payment</span>
            </h5>
            <div className="bg-light p-30">
              <div className="form-group">
                <div className="custom-control custom-radio">
                  <input
                    checked
                    type="radio"
                    className="custom-control-input"
                    id="paypal"
                  />
                  <label className="custom-control-label" for="paypal">
                    Paypal
                  </label>
                </div>
              </div>
              <button
                disabled={cartItems.length === 0 || !info}
                onClick={createOrder}
                className="btn btn-block btn-primary font-weight-bold py-3"
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
