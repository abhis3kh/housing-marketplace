import React from 'react';
import { Link } from 'react-router-dom';
import rentCategoryImage from '../assets/jpg/rentCategoryImage.jpg';
import sellCategoryImage from '../assets/jpg/sellCategoryImage.jpg';
const Explore = () => {
  return (
    <div className='explore'>
      <header className='pageHeader'>Explore</header>
      <main>
        {/* Slider */}
        <p className='exploreCategoryHeading'>Categories</p>
        <div className='exploreCategories'>
          <Link to='/category/rent'>
            <img
              src={rentCategoryImage}
              alt='Rent Category'
              className='exploreCategoryImg'
            />
            <p className='explreCategoryName'>Places for Rent</p>
          </Link>
          <Link to='/category/sale'>
            <img
              src={sellCategoryImage}
              alt='Sell Category'
              className='exploreCategoryImg'
            />
            <p className='explreCategoryName'>Places for Sell</p>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Explore;
