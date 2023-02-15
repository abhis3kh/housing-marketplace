import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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
const Category = () => {
  // initialize the stateVariables
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastFetchedListing, setLastFetchedListing] = useState(null);
  const [count, setCount] = useState(0);
  // counting the document numbers in the collection to show loading button dynamically
  const getCount = async () => {
    const firestore = getFirestore();
    const featureGroup = collectionGroup(firestore, 'listings');
    const snapshot = await getCountFromServer(featureGroup);
    const count = snapshot.data().count;
    setCount(count);
  };
  //   initialize the params to get listingId from Url
  const params = useParams();
  useEffect(() => {
    const fetchListing = async () => {
      try {
        //get a reference
        const listingsRef = collection(db, 'listings');
        // create a query
        const q = query(
          listingsRef,
          where('type', '==', params.categoryName), // getting all the listing for request params either :  rent/sell
          orderBy('timestamp', 'desc'), //ordering the data by timeStamp in decendening order.
          limit(10) //only give 10 per request
        );
        // execte the query
        const querySnap = await getDocs(q);
        // getting last item
        const lastVisible = querySnap.docs[querySnap.docs.length - 1];
        // setting the last item to an state Variable, so we can use it as a reference when getting the next set of values
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
        // getCount
        getCount();
      } catch (error) {
        toast.error(`Couldn't fetch the listings`);
      }
    };
    // Calling the function
    fetchListing();
  }, [params.categoryName]);

  // For loading more listings : Pagination

  const onLoadMorefetchListing = async () => {
    try {
      //get a reference
      const listingsRef = collection(db, 'listings');
      // create a query
      const q = query(
        listingsRef,
        where('type', '==', params.categoryName), //getting all the listing for request params means rent/sell
        orderBy('timestamp', 'desc'), //ordering the data by timeStamp in decendening order.
        // to get the item after previous items
        startAfter(lastFetchedListing),
        limit(2) //only give 10 per request
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
          {/* If the count of the total document is less than the current listing size then only we will show the load more data */}
          {lastFetchedListing && listing.length < count && (
            <p className='loadMore' onClick={onLoadMorefetchListing}>
              Load More
            </p>
          )}
        </>
      ) : (
        <p>No listings for {params.categoryName}</p>
      )}
    </div>
  );
};

export default Category;
