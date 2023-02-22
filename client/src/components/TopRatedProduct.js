import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import StarRatingComponent from 'react-star-rating-component';
import { addToCart } from '../redux/slices/cartSlice';
import { fetchTopProducts } from '../redux/slices/productSlice';

function TopRatedProduct() {
  const dispatch = useDispatch();
  const { topProducts } = useSelector((state) => state.products);
  const navigate = useNavigate();
  const addToCartt = (product) => {
    dispatch(addToCart(product));
    navigate(`/cart`);
  };
  useEffect(() => {
    dispatch(fetchTopProducts());
  }, [dispatch]);
  return (
    <div className="container-fluid pt-5 pb-3">
      <h2 className="section-title position-relative text-uppercase mx-xl-5 mb-4">
        <span className="bg-secondary pr-3">Top Rated Products</span>
      </h2>
      <div className="row px-xl-5">
        {topProducts?.map((topProduct) => (
          <div
            className="col-lg-3 col-md-4 col-sm-6 pb-1"
            key={topProduct?._id}
          >
            <div className="product-item bg-light mb-4">
              <div className="product-img position-relative overflow-hidden">
                <img
                  className="img-fluid w-100"
                  src={topProduct?.imgUrl}
                  alt=""
                />
                <div className="product-action">
                  <a
                    className="btn btn-outline-dark btn-square"
                    onClick={() => addToCartt(topProduct)}
                  >
                    <i className="fa fa-shopping-cart"></i>
                  </a>
                  <a class="btn btn-outline-dark btn-square" href="">
                    <i class="fa fa-sync-alt"></i>
                  </a>
                  <Link
                    className="btn btn-outline-dark btn-square"
                    to={`/shop/${topProduct._id}`}
                  >
                    <i className="fa fa-search"></i>
                  </Link>
                </div>
              </div>
              <div className="text-center py-4">
                <a className="h6 text-decoration-none" href="">
                  {topProduct?.productName}
                </a>
                <div className="d-flex align-items-center justify-content-center mt-2">
                  <h5>${topProduct?.price}.00</h5>
                  <h6 className="text-muted ml-2">
                    <del>${topProduct?.price + 3}.00</del>
                  </h6>
                </div>
                <div className="d-flex align-items-center justify-content-center mb-1">
                  <StarRatingComponent
                    name="rate2"
                    editing={false}
                    starCount={5}
                    value={topProduct?.avgRating}
                  />
                  <small className="mb-2">
                    ({topProduct?.reviews?.length})
                  </small>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TopRatedProduct;
