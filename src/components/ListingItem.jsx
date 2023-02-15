import { Link } from 'react-router-dom';
import { ReactComponent as DeletionIcon } from '../assets/svg/deleteIcon.svg';
import { ReactComponent as EditIcon } from '../assets/svg/editIcon.svg';
import bedIcon from '../assets/svg/bedIcon.svg';
import bathtubIcon from '../assets/svg/bathtubIcon.svg';

const ListingItem = ({ listing, id, onDelete, onEdit }) => {
  //onDelete, onEdit function passed from parent : Profile.jsx as only from profile page, one should update/delete their own property. Category and Offer Page doesn't provide any onDelete so delete button is disabled.
  return (
    <li className='categoryListing'>
      {/* Wrapping it around Link, so any click on the item will redirect user to it's own personal Property Page */}
      <Link
        to={`/category/${listing.type}/${id}`}
        className='categoryListingLink'
      >
        {/* Showing the first image of the property */}
        <img
          src={listing.imgUrls[0]}
          alt={listing.name}
          className='categoryListingImg'
        />
        <div className='categoryListingDetails'>
          <p className='categoryListingLocation'>{listing.location}</p>
          <p className='categoryListingName'>{listing.name}</p>
          <p className='categoryListingPrice'>
            ₹ {/* will give ',' after every 3 000s */}
            {listing.offer
              ? listing.discountedPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
              : listing.regularPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            {/* Dynamically showing if it is renting or selling property */}
            {listing.type === 'rent' && ' / Month'}
          </p>
          <div className='categoryListingInfoDiv'>
            <img src={bedIcon} alt='Bed' />
            <p className='categoryListingInfoText'>
              {listing.bedrooms > 1
                ? `${listing.bedrooms} Beedrooms`
                : `${listing.bedrooms} Beedroom`}
            </p>
            <img src={bathtubIcon} alt='bathtub' />
            <p className='categoryListingInfoText'>
              {listing.bathrooms > 1
                ? `${listing.bathrooms} Bathrooms`
                : `${listing.bathrooms} Bathroom`}
            </p>
          </div>
        </div>
      </Link>
      {/* If one want to delete a item (user needs to be owner of the item) */}
      {onDelete && (
        <DeletionIcon
          className='removeItem'
          fill='rgb(231,76,60)'
          onClick={() => onDelete(listing.id, listing.name)}
        />
      )}

      {/* Showing Edit Icon if anything passes from Parent as this is reusable component*/}
      {onEdit && <EditIcon onClick={() => onEdit(id)} className='editIcon' />}
    </li>
  );
};

export default ListingItem;
