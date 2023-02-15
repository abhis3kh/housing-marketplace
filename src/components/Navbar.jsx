import { useNavigate, useLocation } from 'react-router-dom';
import { ReactComponent as OfferIcon } from '../assets/svg/localOfferIcon.svg';
import { ReactComponent as ExploreIcon } from '../assets/svg/exploreIcon.svg';
import { ReactComponent as PersonOutlineIcon } from '../assets/svg/personOutlineIcon.svg';
const Navbar = () => {
  // initialize
  const navigate = useNavigate();
  const location = useLocation();
  //   matching the path to highlight the current tab
  const pathMatchedRoute = (route) => {
    if (route === location.pathname) {
      //checking the routes with the current
      return true;
    }
    return false;
  };
  return (
    <footer className='navbar'>
      <nav className='navbarNav'>
        <ul className='navbarListItems'>
          <li className='navbarListItem'>
            <ExploreIcon
              // for making the current selected element darken
              fill={pathMatchedRoute('/') ? '#2c2c2c' : '#8f8f8f'}
              width='36px'
              height='36px'
              onClick={() => navigate('/')}
            />
            <p
              className={
                pathMatchedRoute('/')
                  ? 'navbarListItemNameActive'
                  : 'navbarListItemName'
              }
            >
              Explore
            </p>
          </li>
          <li className='navbarListItem'>
            <OfferIcon
              fill={pathMatchedRoute('/offer') ? '#2c2c2c' : '#8f8f8f'}
              width='36px'
              height='36px'
              onClick={() => navigate('/offer')}
            />
            <p
              className={
                pathMatchedRoute('/offer')
                  ? 'navbarListItemNameActive'
                  : 'navbarListItemName'
              }
            >
              Offers
            </p>
          </li>
          <li className='navbarListItem'>
            <PersonOutlineIcon
              fill={pathMatchedRoute('/profile') ? '#2c2c2c' : '#8f8f8f'}
              width='36px'
              height='36px'
              onClick={() => navigate('/profile')}
            />
            <p
              className={
                pathMatchedRoute('/profile')
                  ? 'navbarListItemNameActive'
                  : 'navbarListItemName'
              }
            >
              Profile
            </p>
          </li>
        </ul>
      </nav>
    </footer>
  );
};

export default Navbar;
