import React, { useContext, useEffect } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import {
  fetchOrder,
  OrderDelivered,
  paidOrder,
} from '../redux/slices/orderSlice';

function Order(props) {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { order, success } = useSelector((state) => state.orders);
  const { user, getUser, currentUser } = useContext(AuthContext);

  useEffect(() => {
    //if (!order || order._id !== id || success) {
    dispatch(fetchOrder(id));
    //}
    getUser(order?.userId);
  }, [order, success]);

  const updateOrderToPaid = () => {
    dispatch(paidOrder(order?._id));
  };
  const updateOrderToDelivered = () => {
    dispatch(OrderDelivered(order?._id));
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
              <span className="breadcrumb-item active">Order</span>
            </nav>
          </div>
        </div>
      </div>

      <div className="container-fluid">
        <div className="row px-xl-5">
          <div className="col-lg-8 table-responsive mb-5">
            <h5 className="section-title position-relative text-uppercase mb-3">
              <span className="bg-secondary pr-3">Shipping</span>
            </h5>
            <div className="bg-light p-3 mb-2">
              <p>
                <strong>Name : </strong>
                {user?.fullName}
              </p>
              <p>
                <strong>Email : </strong>
                <a href={`mailto:${user?.email}`}>{user?.email}</a>
              </p>
              <strong>Address : </strong>
              {order?.shippingAddress?.address}, {order?.shippingAddress?.city}{' '}
              {order?.shippingAddress?.postalCode},{' '}
              {order?.shippingAddress?.country}
              {order?.isShipped ? (
                <div className="alert alert-success my-2">
                  Delivered on {order?.shippedAt}
                </div>
              ) : (
                <div className="alert alert-danger my-2">Not Delivered</div>
              )}
            </div>
            <h5 className="section-title position-relative text-uppercase mb-3">
              <span className="bg-secondary pr-3">Payment Method</span>
            </h5>{' '}
            <div className="bg-light p-3 mb-2">
              <h6>Method : Paypal</h6>
              {order?.isPaid ? (
                <div className="alert alert-success my-2">
                  Paid on {order?.paidAt}
                </div>
              ) : (
                <div className="alert alert-danger my-2">Not Paid</div>
              )}
            </div>
            <h5 className="section-title position-relative text-uppercase mb-3">
              <span className="bg-secondary pr-3">Order Items</span>
            </h5>
            <table className="table table-light table-borderless table-hover text-center mb-0">
              <tbody className="align-middle ">
                {order?.orderItems?.map((item) => (
                  <tr className="d-flex justify-content-between">
                    <td className="align-middle">
                      <img
                        src={item.imgUrl}
                        alt={item.productName}
                        style={{ width: '50px' }}
                      />{' '}
                      {item.productName}
                    </td>
                    <td className="align-middle">
                      {item.cartQuantity} * ${item.price}= $
                      {item.price * item.cartQuantity}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="col-lg-4">
            <h5 className="section-title position-relative text-uppercase mb-3">
              <span className="bg-secondary pr-3">Order Total</span>
            </h5>
            <div className="bg-light p-30 mb-5">
              <div className="border-bottom">
                <h6 className="mb-3">Products</h6>
                {order?.orderItems?.map((item) => (
                  <div className="d-flex justify-content-between">
                    <p>{item.productName}</p>
                    <p>${item.price}</p>
                  </div>
                ))}
              </div>
              <div className="border-bottom pt-3 pb-2">
                <div className="d-flex justify-content-between mb-3">
                  <h6>Subtotal</h6>
                  <h6> ${order?.itemsPrice}</h6>
                </div>
                <div className="d-flex justify-content-between">
                  <h6 className="font-weight-medium">Shipping</h6>
                  <h6 className="font-weight-medium">
                    ${order?.shippingPrice}
                  </h6>
                </div>
              </div>
              <div className="border-bottom py-2">
                <div className="d-flex justify-content-between mt-2">
                  <h5>Total</h5>
                  <h5> ${order?.totalPrice}</h5>
                </div>
              </div>
              <div className="mt-2">
                <PayPalScriptProvider
                  options={{
                    'client-id':
                      'ARACuuvji6SuhCXgs5egLULid8mTMivNmGszv7_5oMQrj9_7XADt8pcPoAYKAy3RU0Th01F2RoNzKSMq',
                  }}
                >
                  <PayPalButtons
                    createOrder={(data, actions) => {
                      return actions.order.create({
                        purchase_units: [
                          {
                            amount: {
                              value: order?.totalPrice,
                            },
                          },
                        ],
                      });
                    }}
                    onApprove={(data, actions) => {
                      return actions.order.capture().then((details) => {
                        const name = details.payer.name.given_name;
                        alert(`Transaction completed by ${name}`);
                        updateOrderToPaid();
                      });
                    }}
                  />
                </PayPalScriptProvider>

                {currentUser &&
                  currentUser?.isAdmin &&
                  order?.isPaid &&
                  !order?.isShipped && (
                    <button
                      onClick={() => updateOrderToDelivered()}
                      className="btn btn-block btn-info font-weight-bold my-3 py-3"
                    >
                      Mark As Delivered
                    </button>
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Order;
