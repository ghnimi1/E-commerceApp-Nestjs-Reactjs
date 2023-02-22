import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { addToCart } from '../redux/slices/cartSlice';
import StarRatingComponent from 'react-star-rating-component';

function FeaturedProducts() {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const navigate = useNavigate();
  const addToCartt = (product) => {
    dispatch(addToCart(product));
    navigate(`/cart`);
  };

  return (
    <div className="container-fluid pt-3 pb-2">
      <h2 className="section-title position-relative text-uppercase mx-xl-5 mb-4">
        <span className="bg-secondary pr-3">Featured Products</span>
      </h2>
      <div className="row px-xl-5">
        {products?.products?.slice(0, 8).map((product) => (
          <div className="col-lg-3 col-md-4 col-sm-6 pb-1" key={product?._id}>
            <div className="product-item bg-light mb-4">
              <div className="product-img position-relative overflow-hidden">
                <img className="img-fluid w-100" src={product?.imgUrl} alt="" />
                <div className="product-action">
                  <a
                    className="btn btn-outline-dark btn-square"
                    onClick={() => addToCartt(product)}
                  >
                    <i className="fa fa-shopping-cart"></i>
                  </a>
                  <a class="btn btn-outline-dark btn-square" href="">
                    <i class="fa fa-sync-alt"></i>
                  </a>
                  <Link
                    className="btn btn-outline-dark btn-square"
                    to={`/shop/${product._id}`}
                  >
                    <i className="fa fa-search"></i>
                  </Link>
                </div>
              </div>
              <div className="text-center py-4">
                <a className="h6 text-decoration-none" href="">
                  {product?.productName}
                </a>
                <div className="d-flex align-items-center justify-content-center mt-2">
                  <h5>${product?.price}.00</h5>
                  <h6 className="text-muted ml-2">
                    <del>${product?.price + 3}.00</del>
                  </h6>
                </div>
                <div className="d-flex align-items-center justify-content-center mb-1">
                  <StarRatingComponent
                    name="rate2"
                    editing={false}
                    starCount={5}
                    value={product?.avgRating}
                  />
                  <small className="mb-2">({product?.reviews?.length})</small>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FeaturedProducts;
