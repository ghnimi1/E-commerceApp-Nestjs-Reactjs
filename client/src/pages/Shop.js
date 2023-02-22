import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useParams } from 'react-router-dom';
import ShopItem from '../components/ShopItem';
import { fetchAllProducts } from '../redux/slices/productSlice';

function Shop({ keyword }) {
  const dispatch = useDispatch();
  const [sortBy, setSortBy] = useState('');
  const { products } = useSelector((state) => state.products);
  const { pageNumber } = useParams() || 1;
  useEffect(() => {
    dispatch(
      fetchAllProducts({
        keyword: '',
        pageNumber,
        sortBy,
      }),
    );
  }, [pageNumber, sortBy]);
  return (
    <div>
      <div className="container-fluid">
        <div className="row px-xl-5">
          <div className="col-12">
            <nav className="breadcrumb bg-light mb-30">
              <Link className="breadcrumb-item text-dark" to="/">
                Home
              </Link>
              <span className="breadcrumb-item active">Shop</span>
            </nav>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row px-xl-5">
          <div className="col-lg-3 col-md-4">
            <h5 className="section-title position-relative text-uppercase mb-3">
              <span className="bg-secondary pr-3">Filter by price</span>
            </h5>
            <div className="bg-light p-4 mb-30">
              <form>
                <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    checked
                    id="price-all"
                  />
                  <label className="custom-control-label" for="price-all">
                    All Price
                  </label>
                  <span className="badge border font-weight-normal">1000</span>
                </div>
                <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="price-1"
                  />
                  <label className="custom-control-label" for="price-1">
                    $0 - $100
                  </label>
                  <span className="badge border font-weight-normal">150</span>
                </div>
                <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="price-2"
                  />
                  <label className="custom-control-label" for="price-2">
                    $100 - $200
                  </label>
                  <span className="badge border font-weight-normal">295</span>
                </div>
                <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="price-3"
                  />
                  <label className="custom-control-label" for="price-3">
                    $200 - $300
                  </label>
                  <span className="badge border font-weight-normal">246</span>
                </div>
                <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="price-4"
                  />
                  <label className="custom-control-label" for="price-4">
                    $300 - $400
                  </label>
                  <span className="badge border font-weight-normal">145</span>
                </div>
                <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="price-5"
                  />
                  <label className="custom-control-label" for="price-5">
                    $400 - $500
                  </label>
                  <span className="badge border font-weight-normal">168</span>
                </div>
              </form>
            </div>
          </div>

          <div className="col-lg-9 col-md-8">
            <div className="row pb-3">
              <div className="col-12 pb-1">
                <div className="d-flex align-items-center justify-content-between mb-4">
                  <div>
                    <button className="btn btn-sm btn-light">
                      <i className="fa fa-th-large"></i>
                    </button>
                    <button className="btn btn-sm btn-light ml-2">
                      <i className="fa fa-bars"></i>
                    </button>
                  </div>
                  <div className="ml-2">
                    <select
                      onChange={(e) => setSortBy(e.target.value)}
                      class="custom-select"
                    >
                      <option selected value={'Newest'}>
                        Newest
                      </option>
                      <option value={'Oldest'}>Oldest</option>
                      <option value={'A - Z'}>A - Z</option>
                      <option value={'Z - A'}>Z - A</option>
                      <option value={'Price Low to High'}>
                        Price Low to High
                      </option>
                      <option value={'Price High to Low'}>
                        Price High to Low
                      </option>
                    </select>
                  </div>
                </div>
              </div>
              {products?.fiproducts ? (
                <ShopItem products={products?.fiproducts} />
              ) : (
                <ShopItem products={products?.products} />
              )}

              {products?.pages > 1 && (
                <div className="col-12">
                  <nav>
                    <ul className="pagination justify-content-center">
                      <li
                        className={`page-item ${
                          products?.page === 1 ? 'disabled' : null
                        }`}
                      >
                        <NavLink
                          className="page-link"
                          to={
                            keyword
                              ? `/shop/${keyword}/page/${products?.page - 1}`
                              : `/shop/page/${products?.page - 1}`
                          }
                        >
                          <span>Previous</span>
                        </NavLink>
                      </li>
                      {[...Array(products?.pages)?.keys()].map((x) => (
                        <li
                          className={`page-item ${
                            x + 1 === products?.page ? 'active' : null
                          } `}
                        >
                          <NavLink
                            className="page-link"
                            to={
                              keyword
                                ? `/shop/${keyword}/page/${x + 1}`
                                : `/shop/page/${x + 1}`
                            }
                          >
                            {x + 1}
                          </NavLink>
                        </li>
                      ))}
                      <li
                        className={`page-item ${
                          products?.page === products?.pages ? 'disabled' : null
                        }`}
                      >
                        <NavLink
                          className="page-link"
                          to={
                            keyword
                              ? `/shop/${keyword}/page/${products?.page + 1}`
                              : `/shop/page/${products?.page + 1}`
                          }
                        >
                          Next
                        </NavLink>
                      </li>
                    </ul>
                  </nav>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Shop;
