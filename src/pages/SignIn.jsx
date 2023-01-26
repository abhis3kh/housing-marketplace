import React, { useState } from 'react';
import visibilityIcon from '../assets/svg/visibilityIcon.svg';
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { toast } from 'react-toastify';
const SignIn = () => {
  const navigate = useNavigate();
  // for showing the password in text or not
  const [showPassword, setShowPassword] = useState(false);
  // taking the form data as a whole object then destrucing it.
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  // destrucing it
  const { email, password } = formData;
  // defining the handler
  const onChangeHandle = (e) => {
    setFormData((prevState) => ({
      // returing the previous state with the changed value updated in 2nd line
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };
  // signing
  const onSubmitHandle = async (e) => {
    e.preventDefault();
    try {
      // getting the auth initialized
      const auth = getAuth();
      const userCredentails = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (userCredentails.user) {
        //if it is valid user
        navigate('/'); //navigate back to home
      }
    } catch (error) {
      // if anything goes wrong
      const errorMessage = error.message;
      if (errorMessage.includes('auth/user-not-found')) {
        toast.error(`User doesn't exist in the database !!!`);
      } else if (errorMessage.includes('auth/wrong-password')) {
        toast.error(`Entered password is incorrect !!!`);
      } else {
        toast.error('Something went wrong !!!');
      }
    }
  };
  return (
    <>
      <div className='pageContainer'>
        <header>
          <p className='pageHeader'>Welcome !!!</p>
        </header>
        <main>
          <form onSubmit={onSubmitHandle}>
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
