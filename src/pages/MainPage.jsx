import React from 'react';
import { Route, useRouteMatch } from 'react-router-dom';
import Explore from '../components/Explore';
import NavigationBar from '../components/NavigationBar';

export default function MainPage() {
  const { path } = useRouteMatch();

  return (
    <>
      <NavigationBar />
      <Route path={`${path}/explore`} component={Explore} />
    </>
  );
}
