import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import Explore from './pages/Explore';
import ForgotPassword from './pages/ForgotPassword';
import Category from './pages/Category';
import Offer from './pages/Offer';
import Profile from './pages/Profile';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CreateListing from './pages/CreateListing';
import Listing from './pages/Listing';
const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Explore />} />
          <Route path='/offer' element={<Offer />} />
          <Route path='/category/:categoryName' element={<Category />} />
          {/* for protected route */}
          <Route path='/profile' element={<PrivateRoute />}>
            <Route path='/profile' element={<Profile />} />
          </Route>
          <Route path='/create-listing' element={<CreateListing />} />
          <Route
            path='/category/:categoryName/:listingId'
            element={<Listing />}
          />
          <Route path='/sign-in' element={<SignIn />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
        </Routes>
        {/* Navigation Bar */}
        <Navbar />
      </Router>
      {/* Geting the toastify to show error/success messages */}
      <ToastContainer />
    </>
  );
};

export default App;
