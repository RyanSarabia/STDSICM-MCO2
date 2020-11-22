/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import axios from 'axios';
import Explore from '../components/Explore';
import Create from '../components/Create';
import NavigationBar from '../components/NavigationBar';
import Profile from '../components/Profile';

export default function MainPage() {
  const [userID, setUserID] = useState();

  useEffect(() => {
    axios.get('/getID').then((res) => {
      setUserID(res.data.user_id);
    });
  });

  const logout = () => {
    axios.get('/logout').then((res) => {
      if (res.data === 'success') {
        window.location.reload();
      }
    });
  };

  return (
    <>
      <NavigationBar logout={logout} userID={userID} />
      <Route path="/explore" component={Explore} />
      <Route path="/create" component={Create} />
      <Route path="/profile/:userID" component={Profile} />
    </>
  );
}