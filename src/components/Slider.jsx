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
  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getDetails = async () => {
      const listingRef = collection(db, 'listings');
      const q = query(listingRef, orderBy('timestamp', 'desc'), limit(5));
      const qSnap = await getDocs(q);
      const listings = [];
      qSnap.forEach((doc) => {
        listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setListings(listings);
    };
    getDetails();
    setLoading(false);
  }, []);
  if (loading) return <Spinner />;
  // if (listings.length === 0) return <></>;
  return (
    listings &&
    listings.length > 0 && (
      <>
        <div className='exploreHeading'>Recommended</div>
        {/* Slide show */}
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          scrollbar={{ dragable: true }}
        >
          {/* images here */}
          {listings.map(({ id, data }) => (
            <SwiperSlide
              key={id}
              onClick={() => {
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
                  ₹
                  {data.discountedPrice
                    ? data.discountedPrice
                    : data.regularPrice}
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
