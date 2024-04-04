// src/App.js
import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductPage from './ProductPage';
import ShoppingCart from './ShoppingCart';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Provider store={store}>
      {/* <BrowserRouter>
      <Routes> */}
      <React.Fragment className="App">
      {/* <Route path="/" element={<ProductPage />} >
     
      </Route>
      <Route path="/cart" element={<ShoppingCart />} ></Route> */}
        <ProductPage />
        <ShoppingCart />
      </React.Fragment>
      {/* </Routes>
      </BrowserRouter> */}
    </Provider>
  );
}

export default App;
