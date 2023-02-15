import React from 'react';
import { useEffect, useState } from 'react';
import {
  collection,
  getDocs,
  where,
  orderBy,
  limit,
  startAfter,
  query,
  getFirestore,
  collectionGroup,
  getCountFromServer,
} from 'firebase/firestore';
import { db } from '../firebase.config';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';
import ListingItem from '../components/ListingItem';
const Offer = () => {
  // counting the document numbers in the collection to show loading button dynamically
  const getCount = async () => {
    const firestore = getFirestore();
    const featureGroup = collectionGroup(firestore, 'listings');
    const snapshot = await getCountFromServer(featureGroup);
    const count = snapshot.data().count;
    setCount(count);
  };
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastFetchedListing, setLastFetchedListing] = useState(null);
  const [count, setCount] = useState(0);
  useEffect(() => {
    const fetchListing = async () => {
      try {
        //get a reference
        const listingsRef = collection(db, 'listings');
        // create a query
        const q = query(
          listingsRef,
          where('offer', '==', true), //getting all the listing which has offer value as true
          orderBy('timestamp', 'desc'), //ordering the data by timeStamp in decendening order.
          limit(2) //only give 10 per request
        );
        // execte the query
        const querySnap = await getDocs(q);
        // getting last item
        const lastVisible = querySnap.docs[querySnap.docs.length - 1];
        setLastFetchedListing(lastVisible);
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
    getCount();
  }, []);
  // Load More Listings - Pagination
  const onLoadMorefetchListing = async () => {
    try {
      //get a reference
      const listingsRef = collection(db, 'listings');
      // create a query
      const q = query(
        listingsRef,
        where('offer', '==', true), //getting all the listing for request params which was visited i.e rent/sell
        orderBy('timestamp', 'desc'), //ordering the data by timeStamp in decendening order.
        // to get the item after previous items
        startAfter(lastFetchedListing),
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
      setListing((prevState) => [...prevState, ...listings]);
      //make the loading dispear as we get the data
      setLoading(false);
    } catch (error) {
      toast.error(`Couldn't fetch the listings`);
    }
  };
  return (
    <div className='category'>
      <header className='pageHeader'>Offers</header>
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
          {/* Load more button */}
          {/* Add a feature to show load only when it something to show otherwise don't show */}
          <br />
          <br />
          {lastFetchedListing && listing.length <= count && (
            <p className='loadMore' onClick={onLoadMorefetchListing}>
              Load More
            </p>
          )}
        </>
      ) : (
        <p>
          There are no offer currently going on. Come back again after sometime.{' '}
        </p>
      )}
    </div>
  );
};

export default Offer;
