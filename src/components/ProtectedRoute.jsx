/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Redirect, Route } from 'react-router-dom';

export default function ProtectedRoute({ component: RenderComponent, user, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (user) {
          return <RenderComponent {...rest} {...props} />;
        }

        return (
          <Redirect
            to={{
              pathname: '/login',
              state: {
                from: props.location,
              },
            }}
          />
        );
      }}
    />
  );
}
