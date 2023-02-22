import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
  addToCart,
  clearCart,
  decreaseCart,
  removeFromCart,
} from '../redux/slices/cartSlice';

function Cart(props) {
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const increment = (cartItem) => {
    dispatch(addToCart(cartItem));
  };
  const decrement = (cartItem) => {
    dispatch(decreaseCart(cartItem));
  };
  const remove = (cartItem) => {
    dispatch(removeFromCart(cartItem));
  };
  const clearAll = () => {
    dispatch(clearCart());
  };
  return (
    <div>
      <div className="container-fluid">
        <div className="row px-xl-5">
          <div className="col-12">
            <nav className="breadcrumb bg-light mb-30">
              <Link className="breadcrumb-item text-dark" to="/">
                Home
              </Link>
              <Link className="breadcrumb-item text-dark" to="/shop">
                Shop
              </Link>
              <span className="breadcrumb-item active">Shopping Cart</span>
            </nav>
          </div>
        </div>
      </div>

      {cartItems.length === 0 ? (
        <div className="bg-light p-30 mb-5">
          <div className="d-flex justify-content-center mb-3">
            <h4>Your cart is empty</h4>
          </div>
        </div>
      ) : (
        <div className="container-fluid">
          <div className="row px-xl-5">
            <div className="col-lg-8 table-responsive mb-5">
              <table className="table table-light table-borderless table-hover text-center mb-0">
                <thead className="thead-dark">
                  <tr>
                    <th>Products</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th>Remove</th>
                  </tr>
                </thead>
                <tbody className="align-middle">
                  {cartItems?.map((item) => (
                    <tr>
                      <td className="align-middle">
                        <img
                          src={item.imgUrl}
                          alt={item.productName}
                          style={{ width: '50px' }}
                        />{' '}
                        {item.productName}
                      </td>
                      <td className="align-middle">${item.price}</td>
                      <td className="align-middle">
                        <div
                          className="input-group quantity mx-auto"
                          style={{ width: '100px' }}
                        >
                          <div className="input-group-btn">
                            <button
                              className="btn btn-sm btn-primary btn-minus"
                              onClick={() => decrement(item)}
                            >
                              <i className="fa fa-minus"></i>
                            </button>
                          </div>
                          <input
                            type="text"
                            className="form-control form-control-sm bg-secondary border-0 text-center"
                            value={item.cartQuantity}
                          />
                          <div className="input-group-btn">
                            <button
                              className="btn btn-sm btn-primary btn-plus"
                              onClick={() => increment(item)}
                            >
                              <i className="fa fa-plus"></i>
                            </button>
                          </div>
                        </div>
                      </td>
                      <td className="align-middle">
                        ${item.price * item.cartQuantity}
                      </td>
                      <td className="align-middle">
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => remove(item)}
                        >
                          <i className="fa fa-times"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="col-lg-4">
              <div className="input-group-append">
                <button
                  onClick={() => clearAll()}
                  className="btn btn-block btn-danger font-weight-bold mb-3 py-3"
                >
                  Clear Cart
                </button>
              </div>

              <h5 className="section-title position-relative text-uppercase mb-3">
                <span className="bg-secondary pr-3">Cart Summary</span>
              </h5>
              <div className="bg-light p-30 mb-5">
                <div className="border-bottom pb-2">
                  <div className="d-flex justify-content-between mb-3">
                    <h6>Subtotal</h6>
                    <h6>
                      $
                      {cartItems
                        .reduce(
                          (acc, item) => acc + item.cartQuantity * item.price,
                          0,
                        )
                        .toFixed(2)}
                    </h6>
                  </div>
                  <div className="d-flex justify-content-between">
                    <h6 className="font-weight-medium">Shipping</h6>
                    <h6 className="font-weight-medium">$0.00</h6>
                  </div>
                </div>
                <div className="pt-2">
                  <div className="d-flex justify-content-between mt-2">
                    <h5>Total</h5>
                    <h5>
                      $
                      {cartItems
                        .reduce(
                          (acc, item) => acc + item.cartQuantity * item.price,
                          0,
                        )
                        .toFixed(2)}
                    </h5>
                  </div>
                  <button
                    onClick={() => navigate('/checkout')}
                    className="btn btn-block btn-primary font-weight-bold my-3 py-3"
                  >
                    Proceed To Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
