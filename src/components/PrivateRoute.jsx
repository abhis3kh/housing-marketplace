import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
// importing our custom hook we have used to detect if a user is logged in or not
import { useAuthStatus } from '../hooks/useAuthStatus';
import Spinner from './Spinner';
const PrivateRoute = () => {
  const { loggedIn, checkingStatus } = useAuthStatus();
  if (checkingStatus) {
    //if it is in progress to check the logging in status
    return <Spinner />;
  }
  //else we will return this : if logged in we will return the child element which embedded in App component. If not, we will redirect it to sign-in page.
  return loggedIn ? <Outlet /> : <Navigate to='/sign-in' />;
};

export default PrivateRoute;
