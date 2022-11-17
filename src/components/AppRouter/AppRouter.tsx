import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import { App } from '../App/App';

import { 
  Home, 
  Feed,
  Login,
  Registration,
  ForgotPassword,
  ResetPassword,
} from '../../pages';


export const AppRouter: React.FunctionComponent = React.memo(() =>{

  const location = useLocation();
  const state = location.state as {backgroundLocation?: Location}

  return(
    <>
    <Routes location={state?.backgroundLocation || location}>

      <Route
      path='/'
      element={<App />}
      >

        <Route 
          index
          element={<Home />}
        />

        <Route 
          path='feed' 
          element={<Feed />}
        />
        
        <Route 
          path='login'  
          element={<Login />}
        />
        <Route 
          path='register'  
          element={<Registration />}
        />
        <Route 
          path='forgot-password'  
          element={<ForgotPassword />}
        />
        <Route 
          path='reset-password'  
          element={<ResetPassword />}
        />

      </Route>

    </Routes>
    </>
  )
})