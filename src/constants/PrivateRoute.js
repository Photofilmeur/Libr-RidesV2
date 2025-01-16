import React, { useContext } from 'react';
import { Navigate} from 'react-router-dom';
import authContext from './authContext';

const PrivateRoute = ({ element }) => {
  const { isAuthenticated } = useContext(authContext);

  return isAuthenticated ? element : <Navigate to="/Account/Login" />;
};

export default PrivateRoute;
