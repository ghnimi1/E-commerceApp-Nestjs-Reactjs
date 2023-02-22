import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import ProviderContext from './context/AuthContext';
import { Provider } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import store from './redux/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <ProviderContext>
      <Provider store={store}>
        <App />
      </Provider>
    </ProviderContext>
  </BrowserRouter>,
);
