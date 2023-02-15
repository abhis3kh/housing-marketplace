import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDocs, collection, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../firebase.config';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import Spinner from './Spinner';
const Slider = () => {
  // initialize
  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // getting top 5 listings from the listing collection
    const getDetails = async () => {
      // creating reference
      const listingRef = collection(db, 'listings');
      // making query
      const q = query(listingRef, orderBy('timestamp', 'desc'), limit(5));
      // executing query
      const qSnap = await getDocs(q);
      const listings = [];
      // only pushing id and data of a particular listing to an array and set it to useState variable at end
      qSnap.forEach((doc) => {
        listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      // setting the listing value to state Variable
      setListings(listings);
    };
    getDetails();
    // setting false so the spinner will be vanished
    setLoading(false);
  }, []);
  // untill we load the data, we show a spinner so we don't get undefined error when rendering elements
  if (loading) return <Spinner />;
  return (
    listings &&
    listings.length > 0 && (
      <>
        <div className='exploreHeading'>Recommended</div>
        {/* Slide show - Used External libary for this : Swiper*/}
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          scrollbar={{ dragable: true }}
        >
          {/* images here */}
          {listings.map(({ id, data }) => (
            // going through each list item and returning a SwiperSlide which we got from Swiper Libary
            <SwiperSlide
              key={id}
              onClick={() => {
                // attaching a naviate incase someone click on one of the images in the silder, so it will direct them to personal page of that listing.
                navigate(`/category/${data.type}/${id}`);
              }}
            >
              <div
                style={{
                  background: `url(${data.imgUrls[0]}) center no-repeat`,
                  backgroundSize: 'cover',
                  minHeight: '30rem',
                }}
                className='swiperSlideDiv'
              >
                <p className='swiperSlideText'>{data.name}</p>
                <p className='swiperSlidePrice'>
                  ₹{' '}
                  {data.discountedPrice
                    ? data.discountedPrice
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                    : data.regularPrice
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  {data.type === 'rent' ? ' / Month ' : ''}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </>
    )
  );
};

export default Slider;
