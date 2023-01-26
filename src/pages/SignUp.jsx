import React, { useState } from 'react';
import visibilityIcon from '../assets/svg/visibilityIcon.svg';
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg';
import { Link, useNavigate } from 'react-router-dom';
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { db } from '../firebase.config';
import { setDoc, doc, serverTimestamp } from 'firebase/firestore';
import { toast } from 'react-toastify';
const SignUp = () => {
  const navigate = useNavigate();
  // for showing the password in text or not
  const [showPassword, setShowPassword] = useState(false);
  // taking the form data as a whole object then destrucing it.
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  // destrucing it
  const { name, email, password } = formData;
  // defining the handler for changing the value in the input fields
  const onChangeHandle = (e) => {
    setFormData((prevState) => ({
      // returing the previous state with the changed value updated in 2nd line
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };
  // when the form gets submmited(Handler)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      // creating the user
      const UserCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      // getting the user for saving it in DB
      const user = UserCredential.user;
      // setting the details to the profile after creating
      // to get current Created user use : auth.currentUser
      // updating the profile
      updateProfile(auth.currentUser, {
        displayName: name, //this name we are taking from user & is a state variable
      });
      // creating a copy of the form data so we can manupulate it
      const formDataCopy = { ...formData };
      // then removing the password field before saving the user to DB as we don't want to expose the password
      delete formDataCopy.password;
      formDataCopy.timestamp = serverTimestamp(); //setting a timestamp when creating
      console.log(formDataCopy);
      // creating the entry in DB
      await setDoc(doc(db, 'users', user.uid), formDataCopy); //this user is coming from userCrendtial.user
      // after logged in we are redirecting the user to home screen
      navigate('/');
    } catch (error) {
      toast.error('Something went wrong with registration !!!');
      console.log(error);
    }
  };
  return (
    <>
      <div className='pageContainer'>
        <header>
          <p className='pageHeader'>Welcome !!!</p>
        </header>
        <main>
          <form onSubmit={handleSubmit}>
            <input
              type='email'
              className='emailInput'
              placeholder='Enter email'
              id='email'
              value={email}
              onChange={onChangeHandle}
            />
            <input
              type='text'
              className='nameInput'
              placeholder='Enter Name'
              id='name'
              value={name}
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
            <div className='signUpBar'>
              <p className='signUpText'>Sign Up</p>
              <button className='signUpButton'>
                <ArrowRightIcon fill='#ffffff' width='34px' height='34px' />
              </button>
            </div>
          </form>
          {/* Google 0Auth Component  */}
          <Link to='/sign-in' className='registerLink'>
            Sign In Instead
          </Link>
        </main>
      </div>
    </>
  );
};
export default SignUp;
