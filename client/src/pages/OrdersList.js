import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { fetchAllOrders } from '../redux/slices/orderSlice';

function OrdersList(props) {
  const { orders } = useSelector((state) => state.orders);
  const { currentUser, users, getUsers } = useContext(AuthContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (currentUser && currentUser?.isAdmin) {
      dispatch(fetchAllOrders());
      getUsers();
    } else {
      navigate('/');
    }
  }, []);
  return (
    <div>
      <div className="container-fluid">
        <div className="row px-xl-5">
          <div className="col-12">
            <nav className="breadcrumb bg-light mb-30">
              <Link className="breadcrumb-item text-dark" to="/">
                Home
              </Link>
              <span className="breadcrumb-item active">Orders</span>
            </nav>
          </div>
        </div>
      </div>

      {orders?.length === 0 ? (
        <div className="bg-light p-30 mb-5">
          <div className="d-flex justify-content-center mb-3">
            <h4>Your Orders is empty</h4>
          </div>
        </div>
      ) : (
        <div className="container-fluid">
          <div className="row px-xl-5">
            <div className="col-lg-12 table-responsive mb-5">
              <table className="table table-light table-borderless table-hover text-center mb-0">
                <thead className="thead-light">
                  <tr>
                    <th>ID</th>
                    <th>USER</th>
                    <th>DATE</th>
                    <th>Total</th>
                    <th>PAID</th>
                    <th>DELIVERED</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody className="align-middle">
                  {orders?.map((item) => (
                    <tr>
                      <td className="align-middle">{item._id}</td>
                      <td className="align-middle">
                        {
                          users?.find((user) => user._id === item?.userId)
                            .fullName
                        }
                      </td>
                      <td className="align-middle">{item.createdAt}</td>
                      <td className="align-middle">${item.totalPrice}</td>
                      <td className="align-middle">
                        {item.isPaid ? (
                          item.paidAt
                        ) : (
                          <i
                            className="fas fa-times"
                            style={{ color: 'red' }}
                          ></i>
                        )}
                      </td>
                      <td className="align-middle">
                        {' '}
                        {item.isShipped ? (
                          item.shippedAt
                        ) : (
                          <i
                            className="fas fa-times"
                            style={{ color: 'red' }}
                          ></i>
                        )}
                      </td>
                      <td className="align-middle">
                        <Link to={`/order/${item._id}`}>
                          <button className="btn btn-sm btn-secondary">
                            Details
                          </button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrdersList;
