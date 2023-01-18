import React, { useState } from 'react';
import visibilityIcon from '../assets/svg/visibilityIcon.svg';
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg';
import { Link } from 'react-router-dom';
const SignIn = () => {
  // for showing the password in text or not
  const [showPassword, setShowPassword] = useState(false);
  // taking the form data as a whole object then destrucing it.
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  // destrucing it
  const { email, password } = formData;
  console.log(email, password);
  // defining the handler
  const onChangeHandle = (e) => {
    setFormData((prevState) => ({
      // returing the previous state with the changed value updated in 2nd line
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };
  return (
    <>
      <div className='pageContainer'>
        <header>
          <p className='pageHeader'>Welcome !!!</p>
        </header>
        <main>
          <form>
            <input
              type='email'
              className='emailInput'
              placeholder='Enter email'
              id='email'
              value={email}
              onChange={onChangeHandle}
            />
            <div className='passwordInputDiv'>
              <input
                type={showPassword ? 'text' : 'password'}
                className='passwordInput'
                placeholder='Enter the password'
                id='password'
                value={password}
                onChange={onChangeHandle}
              />
              <img
                src={visibilityIcon}
                alt='show password'
                className='showPassword'
                onClick={() => setShowPassword((prevState) => !prevState)}
              />
            </div>
            <Link to='/forgot-password' className='forgotPasswordLink'>
              Forgot Password
            </Link>
            <div className='signInBar'>
              <p className='signInText'>Sign In</p>
              <button className='signInButton'>
                <ArrowRightIcon fill='#ffffff' width='34px' height='34px' />
              </button>
            </div>
          </form>
          {/* Google 0Auth Component  */}
          <Link to='/sign-up' className='registerLink'>
            Sign Up Instead
          </Link>
        </main>
      </div>
    </>
  );
};
export default SignIn;
