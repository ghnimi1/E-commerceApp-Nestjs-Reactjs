import { createContext, useState } from 'react';
import axios from '../axios';
import { toast } from 'react-toastify';
import { OrderServices } from '../services/orderServices';

export const AuthContext = createContext();

export default function ProviderContext({ children }) {
  const [errors, setErrors] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [user, setUser] = useState({});
  const [users, setUsers] = useState();
  const token = localStorage.getItem('token');
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  const getUser = (id) => {
    axios
      .get(`/user/${id}`)
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        setErrors({
          ...err.response.data.error,
          message: err.response.data.message,
        });
      });
  };
  const getUsers = () => {
    axios
      .get(`/user`, config)
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        setErrors({
          ...err.response.data.error,
          message: err.response.data.message,
        });
      });
  };

  const updateUser = (data) => {
    axios
      .patch(`/user/update`, data, config)
      .then((res) => {
        setCurrentUser(res.data);
        toast.success('success update', {
          position: 'bottom-left',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        });
      })
      .catch((err) => {
        setErrors({
          ...err.response.data.error,
          message: err.response.data.message,
        });
      });
  };
  const getCurrentUser = (id) => {
    axios
      .get(`/user/me`, config)
      .then((res) => {
        setCurrentUser(res.data);
      })
      .catch((err) => {
        setErrors({
          ...err.response.data.error,
          message: err.response.data.message,
        });
      });
  };

  const signin = (user, navigate) => {
    axios
      .post('/auth/login', user)
      .then((res) => {
        localStorage.setItem('token', res.data.token);
        toast.success('success login', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        });
        navigate('/');
        setErrors({});
      })
      .catch((err) => {
        setErrors({
          ...err.response.data.error,
          message: err.response.data.message,
        });
      });
  };

  const signup = (user, navigate) => {
    axios
      .post('/auth/register', user)
      .then((res) => {
        toast.success('success register', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        });
        navigate('/login');
        setErrors({});
      })
      .catch((err) =>
        setErrors({
          ...err.response.data.error,
          message: err.response.data.message,
        }),
      );
  };

  return (
    <AuthContext.Provider
      value={{
        signin,
        signup,
        errors,
        getUser,
        getUsers,
        getCurrentUser,
        updateUser,
        user,
        currentUser,
        users,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
