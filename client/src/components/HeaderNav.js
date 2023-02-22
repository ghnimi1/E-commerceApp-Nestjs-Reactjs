/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { fetchAllProducts } from '../redux/slices/productSlice';

function HeaderNav(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState('');
  const { cartItems } = useSelector((state) => state.cart);
  const { getCurrentUser, currentUser } = useContext(AuthContext);
  const token = localStorage.getItem('token');
  const Logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('cartItems');
    navigate('/login');
  };
  const filterByCategories = (category) => {
    dispatch(fetchAllProducts({ category }));
    navigate('/shop');
  };
  useEffect(() => {
    if (token) {
      getCurrentUser();
    }
    dispatch(fetchAllProducts({ keyword }));
  }, []);

  return (
    <div>
      <div className="container-fluid">
        <div className="row bg-secondary py-1 px-xl-5">
          <div className="col-lg-6 d-none d-lg-block">
            <div className="d-inline-flex align-items-center h-100">
              <a className="text-body mr-3" href="">
                About
              </a>
              <a className="text-body mr-3" href="">
                Contact
              </a>
              <a className="text-body mr-3" href="">
                Help
              </a>
              <a className="text-body mr-3" href="">
                FAQs
              </a>
            </div>
          </div>
          <div className="col-lg-6 text-center text-lg-right">
            <div className="d-inline-flex align-items-center">
              {!token && (
                <div className="btn-group">
                  <button
                    type="button"
                    className="btn btn-sm btn-light dropdown-toggle"
                    data-toggle="dropdown"
                  >
                    My Account
                  </button>
                  <div className="dropdown-menu dropdown-menu-right">
                    <Link to="/login" style={{ textDecoration: 'none' }}>
                      <button className="dropdown-item" type="button">
                        Sign in
                      </button>
                    </Link>
                    <Link to="/register" style={{ textDecoration: 'none' }}>
                      <button className="dropdown-item" type="button">
                        Sign up
                      </button>
                    </Link>
                  </div>
                </div>
              )}

              <div className="btn-group">
                <button
                  type="button"
                  className="btn btn-sm btn-light dropdown-toggle"
                  data-toggle="dropdown"
                >
                  EN
                </button>
                <div className="dropdown-menu dropdown-menu-right">
                  <button className="dropdown-item" type="button">
                    FR
                  </button>
                  <button className="dropdown-item" type="button">
                    AR
                  </button>
                </div>
              </div>
            </div>
            <div className="d-inline-flex align-items-center d-block d-lg-none">
              <Link to="/cart" className="btn px-0 ml-2">
                <i className="fas fa-shopping-cart text-dark"></i>
                <span
                  className="badge text-dark border border-dark rounded-circle"
                  style={{ paddingBottom: '2px' }}
                >
                  {cartItems?.length}
                </span>
              </Link>
            </div>
          </div>
        </div>
        <div className="row align-items-center bg-light py-3 px-xl-5 d-none d-lg-flex">
          <div className="col-lg-4">
            <Link to="/" className="text-decoration-none">
              <span className="h1 text-uppercase text-primary bg-dark px-2">
                E
              </span>
              <span className="h1 text-uppercase text-dark bg-primary px-2 ml-n1">
                Shop
              </span>
            </Link>
          </div>
          <div className="col-lg-4 col-6 text-left">
            <form action="">
              <div className="input-group">
                <input
                  onChange={(e) => setKeyword(e.target.value)}
                  type="text"
                  className="form-control"
                  placeholder="Search for products"
                />
                <div className="input-group-append">
                  <span
                    className="input-group-text bg-transparent text-primary"
                    onClick={() => {
                      dispatch(fetchAllProducts({ keyword }));
                      navigate('/shop');
                    }}
                  >
                    <i className="fa fa-search"></i>
                  </span>
                </div>
              </div>
            </form>
          </div>
          <div className="col-lg-4 col-6 text-right">
            <p className="m-0">Customer Service</p>
            <h5 className="m-0">+216 29 554 879</h5>
          </div>
        </div>
      </div>

      <div className="container-fluid bg-dark mb-30">
        <div className="row px-xl-5">
          <div className="col-lg-3 d-none d-lg-block">
            <a
              className="btn d-flex align-items-center justify-content-between bg-primary w-100"
              data-toggle="collapse"
              href="#navbar-vertical"
              style={{ height: '65px', padding: '0 30px' }}
            >
              <h6 className="text-dark m-0">
                <i className="fa fa-bars mr-2"></i>Categories
              </h6>
              <i className="fa fa-angle-down text-dark"></i>
            </a>
            <nav
              className="collapse position-absolute navbar navbar-vertical navbar-light align-items-start p-0 bg-light"
              id="navbar-vertical"
              style={{ width: 'calc(100% - 30px)', zIndex: '999' }}
            >
              <div className="navbar-nav w-100">
                <a
                  onClick={() => filterByCategories('computer')}
                  className="nav-item nav-link"
                >
                  Computer
                </a>
                <a
                  onClick={() => filterByCategories('phone')}
                  className="nav-item nav-link"
                >
                  Phone
                </a>
                <a
                  onClick={() => filterByCategories('electronics')}
                  className="nav-item nav-link"
                >
                  Electronics
                </a>
                <a
                  className="nav-item nav-link"
                  onClick={() => filterByCategories('accessoire')}
                >
                  Accessories
                </a>
                <a
                  onClick={() => filterByCategories('beauty')}
                  className="nav-item nav-link"
                >
                  Beauty
                </a>
              </div>
            </nav>
          </div>
          <div className="col-lg-9">
            <nav className="navbar navbar-expand-lg bg-dark navbar-dark py-3 py-lg-0 px-0">
              <a href="" className="text-decoration-none d-block d-lg-none">
                <span className="h1 text-uppercase text-dark bg-light px-2">
                  Multi
                </span>
                <span className="h1 text-uppercase text-light bg-primary px-2 ml-n1">
                  Shop
                </span>
              </a>
              <button
                type="button"
                className="navbar-toggler"
                data-toggle="collapse"
                data-target="#navbarCollapse"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div
                className="collapse navbar-collapse justify-content-between"
                id="navbarCollapse"
              >
                <div className="navbar-nav mr-auto py-0">
                  <Link to="/" className="nav-item nav-link active">
                    Home
                  </Link>
                  <Link to="/shop" className="nav-item nav-link">
                    Shop
                  </Link>
                  {token && currentUser?.isAdmin === true && (
                    <>
                      <Link to="/orders" className="nav-item nav-link">
                        Orders
                      </Link>
                      <Link to="/create-product" className="nav-item nav-link">
                        Create product
                      </Link>
                    </>
                  )}
                  <Link to="/contact" className="nav-item nav-link">
                    Contact
                  </Link>
                </div>
                <div className="navbar-nav ml-auto py-0 d-none d-lg-block">
                  <Link to="/cart" className="btn px-0 ml-3">
                    <i className="fas fa-shopping-cart text-primary"></i>
                    <span
                      className="badge text-secondary border border-secondary rounded-circle"
                      style={{ paddingBottom: '2px' }}
                    >
                      {cartItems?.length}
                    </span>
                  </Link>
                </div>
                {token && (
                  <div className="navbar-nav">
                    <div className="nav-item dropdown">
                      <a
                        href="#"
                        className="nav-link dropdown-toggle"
                        data-toggle="dropdown"
                      >
                        <img
                          src="https://mdbcdn.b-cdn.net/img/new/avatars/1.webp"
                          className="rounded-circle shadow-4"
                          style={{ width: '35px' }}
                          alt="Avatar"
                        />
                        <i className="fa fa-angle-down mt-1 ml-1"></i>
                      </a>
                      <div className="dropdown-menu bg-primary rounded-0 border-0 m-0">
                        <Link to="/profile" className="dropdown-item">
                          Profile
                        </Link>
                        <a onClick={Logout} className="dropdown-item">
                          Logout
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeaderNav;
