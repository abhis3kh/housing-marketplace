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
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      //   checking if the user already exist,if not will add that to the database.
      const docRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(docRef);
      //   If the user doesn't exist
      if (!docSnap.exists()) {
        //it is not present in DB, so we will create it.
        await setDoc(doc(db, 'users', user.uid), {
          //data we want save for that user
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp(),
        });
        navigate('/');
      }
    } catch (error) {
      toast.error(
        'Unable to login using Google sign in. Please try other methods.'
      );
      console.log(error.message);
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
