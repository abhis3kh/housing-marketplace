import React from 'react';
import { useEffect, useState } from 'react';
import { getAuth, updateProfile } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';
import { updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase.config';
import { toast } from 'react-toastify';
import arrowRight from '../assets/svg/keyboardArrowRightIcon.svg';
import homeIcon from '../assets/svg/homeIcon.svg';
const Profile = () => {
  const auth = getAuth();
  const [changeDetails, setChangeDetails] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });
  // destructing
  const { name, email } = formData;
  const logOut = () => {
    auth.signOut(); //will log out the user
    navigate('/');
  };
  // onsubmit
  const onSubmit = async (e) => {
    try {
      // Only update the display name if it is different from the current one
      if (auth.currentUser.displayName !== name) {
        await updateProfile(auth.currentUser, {
          //this is a promise which updates the data in firebase Authentication
          displayName: name,
        });
      }
      // update in firestore Database
      const userRef = doc(db, 'users', auth.currentUser.uid); // we have to create a reference
      await updateDoc(userRef, {
        name: name, //updating a name, we can only use name only as ES6 supports it.
      });
    } catch (error) {
      toast.error('Could not update the profile details !');
    }
  };
  // onchange
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState, //storing all previous states but if you do anything in next step, it will update that element only
      [e.target.id]: e.target.value,
    }));
  };
  return (
    <div className='profile'>
      <header className='profileHeader'>
        <p className='pageHeader'>My Profile</p>
        <button className='logOut' type='button' onClick={logOut}>
          Log me out
        </button>
      </header>
      <main>
        <div className='profileDetailsHeader'>
          <p className='profileDetailsText'>Personal Data</p>
          <p
            className='changePersonalDetails'
            onClick={() => {
              changeDetails && onSubmit(); //if change details is true then fire the onSubmit function
              setChangeDetails((prevState) => !prevState);
            }}
          >
            {changeDetails ? 'done' : 'change'}
          </p>
        </div>
        <div className='profileCard'>
          <form>
            {/* For Name displaying */}
            <input
              type='text'
              id='name'
              className={!changeDetails ? 'profileName' : 'profileNameActive'}
              disabled={!changeDetails} //only enable when we are in write stage
              onChange={onChange}
              // eslint-disable-next-line no-restricted-globals
              value={name}
            />
            {/* For Email displaying */}
            <input
              type='text'
              id='email'
              className={!changeDetails ? 'profileEmail' : 'profileEmailActive'}
              disabled={!changeDetails} //only enable when we are in write stage
              onChange={onChange}
              value={email}
            />
          </form>
        </div>
        <Link to='/create-listing' className='createListing'>
          <img src={homeIcon} alt='home' />
          <p>Sell or Rent your home</p>
          <img src={arrowRight} alt='CreateButton' />
        </Link>
      </main>
    </div>
  );
};

export default Profile;
