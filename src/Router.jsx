import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Landing from './Pages/Landing/Landing'
import Payment from './Pages/Payment/Payment'
import Orders from "./Pages/Orders/Orders";
import Cart from './Pages/Cart/Cart';
import Auth from './Pages/Auth/Auth';
import Results from './Pages/Results/Results';
import ProductDetail from './Pages/ProductDetail/ProductDetail'
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(
  "pk_test_51QSPlb2LoHF7KE6qrNc6qfrDEBenbQCDcDBTzlNQKSHy6WE3Y1ymei81p1GMz9DxkxDNYEZQpfPtT8rCOJnCyrKw00e1iOjAYF"
);
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';


const Routing = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth />} />
        <Route
          path="/payments"
          element={
            <ProtectedRoute
              msg={"You must log in to pay"}
              redirect={"/payments"}
            >
              <Elements stripe={stripePromise}>
                <Payment />
              </Elements>
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute msg={"You must log in to access your orders"} redirect={"/orders"}>
              <Orders />
            </ProtectedRoute>
          }
        />
        <Route path="/category/:categoryName" element={<Results />} />
        <Route path="/products/:productId" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  );
}

export default Routing;