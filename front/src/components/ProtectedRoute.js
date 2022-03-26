import React, { useContext } from "react";
import { Navigate } from 'react-router-dom';
import UsersContext from "../context/users/UsersContext";
import Cookies from 'js-cookie';

const ProtectedRoute=( {
  redirectPath='/login',
  children,
} ) => {

  // Check user token here

  // const { user }=useContext( UsersContext );
  // const jwt=Cookies.get( 'jwt' );
  // console.log( user )

  if ( true ) {

    return <Navigate to={redirectPath} replace />;

  }

  return children;
};


export default ProtectedRoute;