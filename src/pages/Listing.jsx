import {
  getDoc,
  doc,
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { useEffect, useState } from 'react';
import Spinner from '../components/Spinner';
import shareIcon from '../assets/svg/shareIcon.svg';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { db } from '../firebase.config';
const Listing = () => {
  const params = useParams();
  const [listData, setListData] = useState({});
  const fetchIndividualProperty = async () => {
    try {
      const listRef = collection(db, 'listings');
      // query to fetch all details of sales/rent
      const q = query(
        listRef,
        where('type', '==', params.categoryName),
        orderBy('timestamp', 'desc'),
        limit(10)
      );
      const qSnap = await getDocs(q);
      const listDetails = [];
      qSnap.forEach((doc) => {
        if (doc.id === params.listingId) {
          listDetails.push({
            id: doc.id,
            data: doc.data(),
          });
        }
      });
      setListData(listDetails[0].data);
      console.log(listData.data);
    } catch (error) {
      toast.error("Couldn't fetch the details");
    }
  };
  useEffect(() => {
    fetchIndividualProperty();
  }, []);
  return (
    <>
      <div>Name : {listData.name}</div>
      <div>For : {listData.type}</div>
      <div>Price : {listData.regularPrice}</div>
      <div>Location : {listData.location}</div>
      {listData.imgUrls.map((e) => {
        return <img src={e} />;
      })}
    </>
  );
};

export default Listing;
