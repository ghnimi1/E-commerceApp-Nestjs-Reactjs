import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchAllProducts } from '../redux/slices/productSlice';

function Categories(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const filterByCategories = (category) => {
    dispatch(fetchAllProducts({ category }));
    navigate('/shop');
  };

  return (
    <div className="container-fluid pt-2">
      <h2 className="section-title position-relative text-uppercase mx-xl-5 mb-4">
        <span className="bg-secondary pr-3">Categories</span>
      </h2>
      <div className="row px-xl-5 pb-3">
        <div className="col-lg-3 col-md-4 col-sm-6 pb-1">
          <a
            className="text-decoration-none"
            onClick={() => filterByCategories('computer')}
          >
            <div className="cat-item d-flex align-items-center mb-4">
              <div
                className="overflow-hidden"
                style={{ width: '100px', height: '100px' }}
              >
                <img
                  className="img-fluid"
                  src="data:image/jpeg;base64,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9RIiUWTEiIExIiAiTECIkxAiJMQIiTEBIiReBbY3BUq6GnVRaineGF/Ucj1E57t/2eMuZ8Gc4/8ASc6/0OdD2a3czpRM8lpMtiLJXzrjMA9N2R0ZGX4kYFSPrLbdPoLa2ysPi0yV6Ye3wtuZfwsNR+k5t4g8A1aV3w5OIT7NgKijsNH9Nek0mpVbmxpKmV0aUWplSQQQQbEEWIPIjhJQyyq8Rp7AluhlZGlh71EqoLzyplfD0ndlRFLsxAVQLkk8oFXD0mdlRFLMxAVRqSTynT/C/hxcKuepZ6zDU7wgPyr+549o8LeG1wi56lnrMPMd4UH5V/c8Zscx1vnxF5EyYiUWREmIERJiBESYgRJkRAREQEmREBERAWnkgz1ECi154Yy5giBZMZ4Zpemmp4Sm2GU8xA1vbfh/DYsE1EyvbSollcdz8w6G85ztvwjiMLd1Hv0HzIDcD76bx3FxOytg+TflKL4N+Fj6y01YizlwJGldDOo7c8GUsTdwho1D86KCCfvqNG76HrNExvhfGUamT3LVbmysgzA972y+v1mk1Krc2LPDUnd1p01LsxAVQLknpOseE/DKYNM72esw8zbwgPyr+549pHhDwuuCTO9nrMPM28ID8q/ueM2aU1rnxEyJkyIlFkxIiBMSIgTEiIExIiBMREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQP/9k="
                  alt=""
                />
              </div>
              <div className="flex-fill pl-3">
                <h6>Computer</h6>
              </div>
            </div>
          </a>
        </div>
        <div className="col-lg-3 col-md-4 col-sm-6 pb-1">
          <a
            className="text-decoration-none"
            onClick={() => filterByCategories('phone')}
          >
            <div className="cat-item img-zoom d-flex align-items-center mb-4">
              <div
                className="overflow-hidden"
                style={{ width: '100px', height: '100px' }}
              >
                <img
                  className="img-fluid"
                  src="data:image/jpeg;base64,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"
                  alt=""
                />
              </div>
              <div className="flex-fill pl-3">
                <h6>Phone</h6>
              </div>
            </div>
          </a>
        </div>
        <div className="col-lg-3 col-md-4 col-sm-6 pb-1">
          <a
            className="text-decoration-none"
            onClick={() => filterByCategories('electronics')}
          >
            <div className="cat-item img-zoom d-flex align-items-center mb-4">
              <div
                className="overflow-hidden"
                style={{ width: '100px', height: '100px' }}
              >
                <img className="img-fluid" src="img/cat-2.jpg" alt="" />
              </div>
              <div className="flex-fill pl-3">
                <h6>Electronics</h6>
              </div>
            </div>
          </a>
        </div>
        <div className="col-lg-3 col-md-4 col-sm-6 pb-1">
          <a
            className="text-decoration-none"
            onClick={() => filterByCategories('accessoire')}
          >
            <div className="cat-item img-zoom d-flex align-items-center mb-4">
              <div
                className="overflow-hidden"
                style={{ width: '100px', height: '100px' }}
              >
                <img
                  className="img-fluid"
                  src="data:image/jpeg;base64,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"
                  alt=""
                />
              </div>
              <div className="flex-fill pl-3">
                <h6>Accessories</h6>
              </div>
            </div>
          </a>
        </div>
        <div className="col-lg-3 col-md-4 col-sm-6 pb-1">
          <a
            className="text-decoration-none"
            onClick={() => filterByCategories('beauty')}
          >
            <div className="cat-item img-zoom d-flex align-items-center mb-4">
              <div
                className="overflow-hidden"
                style={{ width: '100px', height: '100px' }}
              >
                <img className="img-fluid" src="img/cat-4.jpg" alt="" />
              </div>
              <div className="flex-fill pl-3">
                <h6>Beauty</h6>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Categories;
