import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  collection,
  getDocs,
  where,
  orderBy,
  limit,
  //   startAfter,
  query,
} from 'firebase/firestore';
import { db } from '../firebase.config';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';
import ListingItem from '../components/ListingItem';
const Category = () => {
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  //   initialize the params
  const params = useParams();
  useEffect(() => {
    const fetchListing = async () => {
      try {
        //get a reference
        const listingsRef = collection(db, 'listings');
        // create a query
        const q = query(
          listingsRef,
          where('type', '==', params.categoryName), //getting all the listing for request params means rent/sell
          orderBy('timestamp', 'desc'), //ordering the data by timeStamp in decendening order.
          limit(10) //only give 10 per request
        );
        // execte the query
        const querySnap = await getDocs(q);
        const listings = [];
        querySnap.forEach((doc) => {
          listings.push({
            id: doc.id, //id of the document
            data: doc.data(), //data of the item
          });
        });
        // setting this filtered value to the state variable
        setListing(listings);
        //make the loading dispear as we get the data
        setLoading(false);
      } catch (error) {
        toast.error(`Couldn't fetch the listings`);
      }
    };
    // Calling the function
    fetchListing();
  }, [params.categoryName]);
  return (
    <div className='category'>
      <header className='pageHeader'>
        {params.categoryName === 'rent' ? 'Places for rent' : 'Places for Sale'}
      </header>
      {loading ? (
        <Spinner />
      ) : listing && listing.length > 0 ? (
        <>
          <main>
            <ul className='categoryListings'>
              {listing.map((item) => {
                return (
                  <ListingItem listing={item.data} id={item.id} key={item.id} />
                );
              })}
            </ul>
          </main>
        </>
      ) : (
        <p>No listings for {params.categoryName}</p>
      )}
    </div>
  );
};

export default Category;
