import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Explore from './pages/Explore';
import ForgotPassword from './pages/ForgotPassword';
import Offer from './pages/Offer';
import Profile from './pages/Profile';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const App = () => {
  return (
    <React.StrictMode>
      <Router>
        <Routes>
          <Route path='/' element={<Explore />} />
          <Route path='/offer' element={<Offer />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/sign-in' element={<SignIn />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
        </Routes>
        {/* Navigation Bar */}
        <Navbar />
      </Router>
      {/* Geting the toastify to show error/success messages */}
      <ToastContainer />
    </React.StrictMode>
  );
};

export default App;
