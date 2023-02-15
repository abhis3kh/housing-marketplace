import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { toast } from 'react-toastify';
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg';
const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  // onChange
  const onChange = (e) => {
    setEmail(e.target.value);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      // send the request to firebase for reset
      await sendPasswordResetEmail(auth, email);
      toast.success(
        'Email was sucessfully sent for password reset in your email address.'
      );
    } catch (error) {
      toast.error(`Coludn't send reset email`);
    }
  };
  return (
    <div className='pageContainer'>
      <header>
        <p className='pageHeader'>Forgot Password</p>
      </header>
      <main>
        <form onSubmit={onSubmit}>
          <input
            type='email'
            name='email'
            id='email'
            className='emailInput'
            placeholder='Enter Email'
            value={email}
            onChange={onChange}
          />
          <Link to='/sign-in' className='forgotPasswordLink'>
            Sign In
          </Link>
          <div className='signInBar'>
            <div className='signInText'>Send Reset Link</div>
            <button className='signInButton'>
              <ArrowRightIcon fill='#ffffff' width='34px' height='34px' />
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default ForgotPassword;
