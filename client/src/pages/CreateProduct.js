import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addProduct } from '../redux/slices/productSlice';

function CreateProduct(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [file, setFile] = useState('');
  const [info, setInfo] = useState('');
  console.log(file);
  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'upload');
    await fetch('https://api.cloudinary.com/v1_1/dnw7or6mq/image/upload', {
      method: 'post',
      body: formData,
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        const url = data.url;
        const newProduct = {
          ...info,
          imgUrl: url,
        };
        dispatch(addProduct(newProduct));
      });
    navigate('/shop');
  };
  return (
    <div>
      <div className="container-fluid">
        <div className="row px-xl-5">
          <div className="col-12">
            <nav className="breadcrumb bg-light mb-30">
              <a className="breadcrumb-item text-dark" href="#">
                Home
              </a>
              <span className="breadcrumb-item active">Create Product</span>
            </nav>
          </div>
        </div>
      </div>

      <div className="container-fluid">
        <h2 className="section-title position-relative text-uppercase mx-xl-5 mb-4">
          <span className="bg-secondary pr-3">Create New Product</span>
        </h2>
        <div className="row px-xl-5">
          <div className="col-lg-3 mb-3">
            <div className="bg-light p-30 mb-30 d-flex justify-content-around ">
              <div class="pic-holder">
                <img
                  id="profilePic"
                  class="pic"
                  src={
                    file
                      ? URL.createObjectURL(file)
                      : 'https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg'
                  }
                  alt=""
                />
                <input
                  onChange={(e) => setFile(e.target.files[0])}
                  class="uploadProfileInput"
                  type="file"
                  id="imgUrl"
                  accept="image/*"
                  style={{ opacity: '0' }}
                />
                <label for="imgUrl" class="upload-file-block">
                  <div class="text-center">
                    <div class="mb-2">
                      <i class="fa fa-camera fa-2x"></i>
                    </div>
                  </div>
                </label>
              </div>
            </div>
          </div>
          <div className="col-lg-9 mb-7">
            <div className="contact-form bg-light p-30">
              <form name="sentMessage" id="contactForm" novalidate="novalidate">
                <div className="control-group">
                  <input
                    type="text"
                    onChange={handleChange}
                    id="productName"
                    className="form-control"
                    placeholder="Your Product Name"
                    required="required"
                  />
                  <p className="help-block text-danger"></p>
                </div>
                <div className="control-group">
                  <input
                    type="number"
                    onChange={handleChange}
                    id="price"
                    className="form-control"
                    name="price"
                    placeholder="Your Price"
                    required="required"
                  />
                  <p className="help-block text-danger"></p>
                </div>
                <div className="control-group">
                  <select
                    className="form-control"
                    id="category"
                    onChange={handleChange}
                    required="required"
                  >
                    <option>select category</option>
                    <option value="computer">computer</option>
                    <option value="phone">phone</option>
                    <option value="electronics">electronics</option>
                    <option value="accessoire">accessoire</option>
                    <option value="beauty">beauty</option>
                  </select>
                  <p className="help-block text-danger"></p>
                </div>
                <div className="control-group">
                  <input
                    type="text"
                    onChange={handleChange}
                    className="form-control"
                    id="shortDesc"
                    placeholder="Your Short Description"
                    required="required"
                  />
                  <p className="help-block text-danger"></p>
                </div>
                <div className="control-group">
                  <textarea
                    className="form-control"
                    rows="8"
                    onChange={handleChange}
                    id="description"
                    placeholder="Your Description"
                    required="required"
                  ></textarea>
                  <p className="help-block text-danger"></p>
                </div>
                <div>
                  <button
                    className="btn btn-primary py-2 px-4"
                    type="submit"
                    id="sendMessageButton"
                    onClick={submitHandler}
                  >
                    Create
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateProduct;
