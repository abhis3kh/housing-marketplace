import React from 'react';
import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase.config';
import { toast } from 'react-toastify';
const Contact = () => {
  const [message, setMessage] = useState('');
  const [landlord, setLanlord] = useState(null);
  // this below will help us to get the query given in the web address
  const [searchPramas, setSearchPramas] = useSearchParams();

  const params = useParams();
  useEffect(() => {
    const getLandLordDetail = async () => {
      console.log(params.landlordId);
      const docRef = doc(db, 'users', params.landlordId);
      const landlordSnap = await getDoc(docRef);
      if (landlordSnap.exists()) {
        // setting the value to state so I can access outside of useEffect
        setLanlord(landlordSnap.data());
        console.log(landlordSnap.data());
      } else {
        toast.error('Something went wrong');
      }
    };
    getLandLordDetail();
  }, [params.landlordId]); //whenever landlord value changes it will fetches new value.
  const handleChange = (e) => {
    setMessage(e.target.value);
  };
  return (
    <>
      <div className='pageContainer'>
        <header>
          <p className='pageHeader'> Contact Landlord</p>
        </header>
        {landlord !== null && (
          <main>
            <div className='contactLandloard'>
              <p className='landlordName'>Contact : {landlord?.name}</p>
            </div>
            <form className='messageForm'>
              <div className='messageDiv'>
                <label htmlFor='message' className='messageLabel'>
                  Message
                </label>
                <textarea
                  name='message'
                  id='message'
                  className='textarea'
                  value={message}
                  onChange={handleChange}
                ></textarea>
              </div>
              <a
                href={`mailto:${
                  landlord.email
                }?Subject=Inquery for ${searchPramas.get(
                  'listingName'
                )}&body=${message}`}
              >
                <button type='button' className='primaryButton'>
                  Send Message
                </button>
              </a>
            </form>
          </main>
        )}
      </div>
    </>
  );
};

export default Contact;
