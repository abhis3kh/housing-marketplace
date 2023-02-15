import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase.config';
import { toast } from 'react-toastify';
import googleIcon from '../assets/svg/googleIcon.svg';
const OAuth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const onGoogleClick = async (e) => {
    try {
      const auth = getAuth();
      // initializing the provider as it will be used a paramter to get signInPopUp
      const provider = new GoogleAuthProvider();
      // Popping up the sign window and getting the detail of user
      const result = await signInWithPopup(auth, provider);
      // getting the user data
      const user = result.user;
      //  ! checking if the user already exist,if yes then not will add that to the database.
      const docRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(docRef);
      //   If the user doesn't exist, we will create a new user
      if (!docSnap.exists()) {
        await setDoc(doc(db, 'users', user.uid), {
          //data we want save for that user
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp(),
        });
        navigate('/'); //redirecting him to home page after success
      }
      //if the user already exist then we will do nothing, we will also redirect him to home page
      navigate('/');
    } catch (error) {
      toast.error(
        'Unable to login using Google sign in. Please try other log in methods.'
      );
    }
  };
  return (
    <div className='socialLogin'>
      {/* if sign in path, then shows sign in otherwise sign up */}
      <p>Sign {location.pathname === '/sign-up' ? 'up' : 'in'} using </p>
      <button className='socialIconDiv' onClick={onGoogleClick}>
        <img
          src={googleIcon}
          alt='Google Login Icon'
          className='socialIconImg'
        />
      </button>
    </div>
  );
};

export default OAuth;
