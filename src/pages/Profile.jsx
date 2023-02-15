import React from 'react';
import { useEffect, useState } from 'react';
import { getAuth, updateProfile } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';
import ListingItem from '../components/ListingItem';
import {
  updateDoc,
  doc,
  collection,
  getDocs,
  query,
  where,
  orderBy,
  deleteDoc,
} from 'firebase/firestore';
import { db } from '../firebase.config';
import { toast } from 'react-toastify';
import arrowRight from '../assets/svg/keyboardArrowRightIcon.svg';
import homeIcon from '../assets/svg/homeIcon.svg';

const Profile = () => {
  const auth = getAuth();
  const [changeDetails, setChangeDetails] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [listing, setListing] = useState(null);

  useEffect(() => {
    const fetchUserListing = async () => {
      const listingRef = collection(db, 'listings');
      const q = query(
        listingRef,
        where('userRef', '==', auth.currentUser.uid),
        orderBy('timestamp', 'desc')
      );
      const qSnap = await getDocs(q);

      const listing = [];
      qSnap.forEach((doc) => {
        return listing.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setListing(listing);
      console.log(listing);
      setLoading(false);
    };
    fetchUserListing();
  }, [auth.currentUser.uid]);

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
  // for deleting a item from the page
  const onDelete = async (id, name) => {
    console.log(`Request for Deleting the product : ${id} recieved. `);
    if (window.confirm(`Are you sure that you want to delete ${name} ?`)) {
      await deleteDoc(doc(db, 'listings', id));
      //now updating the local data which we have to reflect the changes in UI
      const updatedListing = listing.filter((list) => list.id !== id);
      // update it to stateLevel
      setListing(updatedListing);
      // giving a pop saying success
      toast.success(`Sucessfully deleted the ${name} from the listings.`);
    }
  };

  // For editing an item

  const onEdit = (listingId) => navigate(`/edit-listing/${listingId}`);

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
        {!loading && listing.length > 0 && (
          <>
            <p className='listingText'>Your Listings</p>
            <ul className='listingsList'>
              {listing.map((list) => {
                return (
                  <ListingItem
                    key={list.id}
                    listing={list.data}
                    id={list.id}
                    onDelete={() => onDelete(list.id, list.data.name)}
                    onEdit={() => onEdit(list.id)}
                  />
                );
              })}
            </ul>
          </>
        )}
      </main>
    </div>
  );
};

export default Profile;
