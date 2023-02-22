import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Profile(props) {
  const [info, setInfo] = useState({});
  const { updateUser, currentUser } = useContext(AuthContext);
  const onChangeHandler = (e) => {
    setInfo({
      ...info,
      [e.target.name]: e.target.value,
    });
  };
  const updateProfile = (e) => {
    e.preventDefault();
    updateUser(info);
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
              <span className="breadcrumb-item active">Profile</span>
            </nav>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <h2 className="section-title position-relative text-uppercase mx-xl-5 mb-4">
          <span className="bg-secondary pr-3">Profile</span>
        </h2>
        <div className="row px-xl-5">
          <div className="col-lg-5 mb-5">
            <div className="bg-light p-30 mb-30" style={{ maxHeight: '300px' }}>
              <p>
                {' '}
                <strong>Full Name : </strong>
                {currentUser?.fullName}
              </p>
              <p>
                <strong>Email : </strong>
                {currentUser?.email}
              </p>
              {currentUser?.country && (
                <p>
                  <strong>Country : </strong>
                  {currentUser?.country}
                </p>
              )}
              {currentUser?.age && (
                <p>
                  <strong>age : </strong>
                  {currentUser?.age}
                </p>
              )}
            </div>
          </div>
          <div className="col-lg-7 mb-5">
            <div
              className="contact-form bg-light p-30"
              style={{ minHeight: '300px' }}
            >
              <form name="sentMessage" id="contactForm" novalidate="novalidate">
                <div className="control-group mb-2">
                  <input
                    type="text"
                    defaultValue={currentUser?.fullName}
                    className="form-control"
                    onChange={onChangeHandler}
                    name="fullName"
                    placeholder="Your full name"
                  />
                </div>
                <div className="control-group mb-2">
                  <input
                    disabled
                    type="email"
                    defaultValue={currentUser?.email}
                    className="form-control"
                    name="email"
                    placeholder="Your email"
                  />
                </div>
                <div className="control-group mb-2">
                  <input
                    type="text"
                    defaultValue={currentUser?.country}
                    className="form-control"
                    onChange={onChangeHandler}
                    name="country"
                    placeholder="Your country"
                  />
                </div>
                <div className="control-group mb-2">
                  <input
                    type="number"
                    defaultValue={currentUser?.age}
                    className="form-control"
                    onChange={onChangeHandler}
                    name="age"
                    placeholder="Your age"
                  />
                </div>
                <div>
                  <button
                    onClick={updateProfile}
                    className="btn btn-primary py-2 px-4"
                  >
                    Update
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

export default Profile;
