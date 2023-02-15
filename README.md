# House Marketplace - One Stop Solution for selling and renting house/s.

Find and list houses for sale or rent.

Visit the Live Application : [House Marketplace](https://housing-marketplace-chi.vercel.app/)

## Preview

Home Page
<br/>
<br/>
<img src="src\assets\preview\Home Page.PNG">

Individual Listing Page
<br/>
<br/>
<img src="src\assets\preview\Indivual Listing Page.PNG">

Profile Page
<br/>
<br/>
<img src="src\assets\preview\Profile Page.PNG">

Offer Page
<br/>
<br/>
<img src="src\assets\preview\Offer Page.PNG
">

Rent Page
<br/>
<br/>
<img src="src\assets\preview\Rent Page.PNG">

Sale Page
<br/>
<br/>
<img src="src\assets\preview\Sale Page.PNG">
<br/>
<br/>
<br/>

## Major Features of the Application :

1. You can sell/rent your own property. (offered Properties & Normal Properties included)

2. You can buy or take rent of the house from other people who has posted the listing.

3. You can see current location of the house in map which is inbuilt in the application.

4. You can see all the other details about the property eg : furnished, bathrooms ,beedrooms etc.

5. You create your profile using email and password or Google(gmail) Authentication.

6. You able to view other people's listing and contact them directly via email using the contact page of each listing.

7. You can create your own listing for renting or selling of your property. Also editing or deleting your own listing is also available in your profile page.

8. Pagination is built to fetch only limited data and upon request from user(load more button on listings), it will load more 10 records every time we click load more.

## Techs Used to Implement this Project

### Reactjs

For building the frontend, I have used ReactJs. We have used various features of it. for example : useState, useParams, useEffect, conditional rendering, dynamic redirecting of pages using useNavigate. Built custom hook for authenticating with google 0Auth.

### Firebase v9

For Backend work (eg. User Authentication, Image Storage, Data Storage for listing) we have used firebase 9.

### Leaflet

Used LeafLet to showcase the current location of the property in a map which in built in the application.

### Geolocation

The listings use Google geocoding to get the coords from the address field.

### React Toastify

Used React Toastify libary for diplaying error/Success messages.

[Link](https://www.npmjs.com/package/react-toastify)
<br>

## Run

```bash
cd ./toTheDirectory

npm i

npm start

```
