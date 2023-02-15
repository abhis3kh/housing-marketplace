# House Marketplace - One Stop Solution for selling and renting house/s.

Find and list houses for sale or for rent. This is a React Application Build with the help of Firebase 9.

## Features Implemented

1. Log in with email & Password.

2. Log in with Google 0Auth.

3. View other people's listing and contact them directly via email using the contact page of each listing.

4. You can upload your own lisiting as well to rent or sell your property.

5. You can edit or delete your listings.

6. You will able to update your own profile details like name and email address.

7. Pagination is built to fetch only limited data and upon request from user, it will load more 10 records every time we click load more.

8. Used firestore storage for storing the images of the properties.

9. Used firestore database for storing listing details as well as users details to map users to

10. Used different hooks which React offers as well create one custom hook for authenicating.

## Usage

### Geolocation

The listings use Google geocoding to get the coords from the address field. You need to either rename .env.example to .env and add your Google Geocode API key OR in the **CreateListing.jsx** file you can set **geolocationEnabled** to "false" and it will give you lat/lng field to the form which you can add manually.(By Default it is true)

### Run

```bash
npm start
```

Used React_tostify libary for diplaying error/Success messages.
