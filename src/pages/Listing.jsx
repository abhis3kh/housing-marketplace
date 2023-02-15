import { getDoc, doc } from 'firebase/firestore';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { getAuth } from 'firebase/auth';
import { useEffect, useState } from 'react';
import Spinner from '../components/Spinner';
import shareIcon from '../assets/svg/shareIcon.svg';

import { useParams, Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { db } from '../firebase.config';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
const Listing = () => {
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [shareLinkCopied, setShareLinkCopied] = useState(false);

  const params = useParams();
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    const fetchIndividualProperty = async () => {
      try {
        const docRef = doc(db, 'listings', params.listingId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setListing(docSnap.data());
          // console.log(docSnap.data());
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        toast.error("Couldn't fetch the details");
      }
    };
    fetchIndividualProperty();
  }, [navigate, params.listingId]);

  if (loading) {
    return <Spinner />;
  }
  return (
    <main>
      {/* Slide show */}
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ dragable: true }}
      >
        {/* images here */}
        {listing.imgUrls.map((img, index) => (
          <SwiperSlide key={index}>
            <div
              style={{
                background: `url(${listing.imgUrls[index]}) center no-repeat`,
                backgroundSize: 'cover',
                minHeight: '30rem',
              }}
              className='swiperSlideDiv'
            ></div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div
        className='shareIconDiv'
        onClick={() => {
          navigator.clipboard.writeText(window.location.href);
          setShareLinkCopied(true);
          setTimeout(() => {
            setShareLinkCopied(false);
          }, 1000);
        }}
      >
        <img src={shareIcon} alt='Copy Link' />
      </div>
      {shareLinkCopied && <p className='linkCopied'>Link Copied</p>}
      <div className='listingDetails'>
        <p className='listingName'>
          {listing.name} - ₹
          {listing.offer
            ? listing.discountedPrice
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            : listing.regularPrice
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
        </p>
        <p className='listingLocation'>{listing.location}</p>
        <p className='listingType'>
          For {listing.type === 'rent' ? 'Rent' : 'Sale'}
        </p>
        {listing.offer && (
          <p className='discountPrice'>
            {listing.regularPrice - listing.discountedPrice}
            Saved
          </p>
        )}
        <ul className='listingDetailsList'>
          <li>
            {listing.bedrooms > 1
              ? `${listing.bedrooms} Beedrooms`
              : `${listing.bedrooms} Beedroom`}
          </li>
          <li>
            {listing.bathrooms > 1
              ? `${listing.bathrooms} Bathrooms`
              : `${listing.bathrooms} Bathrooms`}
          </li>
          <li>{listing.parking ? 'Parking Spot' : 'No parking Spot'}</li>
          <li>{listing.furnished ? 'Furnished' : 'Not Furnished'}</li>
        </ul>
        <p className='listingLocationTitle'>Location</p>
        {/* Map */}
        <div className='leafletContainer'>
          <MapContainer
            style={{ height: '100%', width: '100%' }}
            center={[listing.geoLocation.lat, listing.geoLocation.lng]}
            zoom={13}
            scrollWheelZoom={false}
          >
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url='https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png'
            />
            <Marker
              position={[listing.geoLocation.lat, listing.geoLocation.lng]}
            />
          </MapContainer>
        </div>
        {auth.currentUser?.uid !== listing.userRef && (
          <Link
            to={`/contact/${listing.userRef}?listingName=${listing.name}`}
            className='primaryButton'
          >
            Contact Land Owner
          </Link>
        )}
      </div>
    </main>
  );
};

export default Listing;
