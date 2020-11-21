import React from 'react';
import { Route } from 'react-router-dom';
import Explore from '../components/Explore';
import Create from '../components/Create';
import NavigationBar from '../components/NavigationBar';
import Profile from '../components/Profile';

export default function MainPage() {
  return (
    <>
      <NavigationBar />
      <Route path="/explore" component={Explore} />
      <Route path="/create" component={Create} />
      <Route path="/profile/:userID" component={Profile} />
    </>
  );
}
