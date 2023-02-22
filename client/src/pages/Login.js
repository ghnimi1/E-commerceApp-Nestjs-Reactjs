import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Login(props) {
  const { signin, errors } = useContext(AuthContext);
  const [info, setInfo] = useState({});
  const navigate = useNavigate();
  const onChangeHandler = (e) => {
    setInfo({
      ...info,
      [e.target.name]: e.target.value,
    });
  };
  const handleLogin = (e) => {
    e.preventDefault();
    signin(info, navigate);
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
              <span className="breadcrumb-item active">Login</span>
            </nav>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <h2 className="section-title position-relative text-uppercase mx-xl-5 mb-4">
          <span className="bg-secondary pr-3">Login</span>
        </h2>
        <div className="row px-xl-5">
          <div className="col-lg-7 mb-5">
            <div
              className="contact-form bg-light p-30"
              style={{ minHeight: '300px' }}
            >
              <form
                onSubmit={handleLogin}
                name="sentMessage"
                id="contactForm"
                novalidate="novalidate"
              >
                <div className="control-group">
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    onChange={onChangeHandler}
                    placeholder="Your Email"
                    required="true"
                  />
                  <p className="help-block text-danger">
                    {' '}
                    {errors?.email?.map((err) => err)}
                  </p>
                </div>
                <div className="control-group">
                  <input
                    type="password"
                    className="form-control"
                    onChange={onChangeHandler}
                    name="password"
                    placeholder="Your Password"
                    required="true"
                  />
                  <p className="help-block text-danger">
                    {errors?.password?.map((err) => err)}
                  </p>
                </div>
                {errors?.message && (
                  <p className="alert alert-danger">{errors?.message}</p>
                )}
                <div>
                  <button type="submit" className="btn btn-primary py-2 px-4">
                    Login
                  </button>
                </div>

                <p className="text-right my-2">
                  Don't have an account?{' '}
                  <Link color="green" to="/register">
                    Register
                  </Link>
                </p>
              </form>
            </div>
          </div>
          <div className="col-lg-5 mb-5">
            <div className="bg-light p-30 mb-30" style={{ maxHeight: '300px' }}>
              <img
                width="100%"
                alt=""
                src="https://img.freepik.com/photos-gratuite/key-lock-mot-passe-securite-protection-vie-privee-graphique_53876-125201.jpg?w=826&t=st=1674643621~exp=1674644221~hmac=a20b6f035fcc25ac63b637ddead254ab94771ab051066bd872202871d611c1e4"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
