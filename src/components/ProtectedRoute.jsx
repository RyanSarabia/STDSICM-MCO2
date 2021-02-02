/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import { Redirect, Route } from 'react-router-dom';
import React, { Component } from 'react';
import axios from 'axios';
import Loading from './Loading';

export default class ProtectedRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: false,
      isLoading: true,
    };
  }

  componentDidMount() {
    axios.get('/validate').then((res) => {
      console.log('check session');
      if (res.data === 'Has Session') {
        this.setState({ user: true, isLoading: false });
      } else {
        this.setState({ user: false, isLoading: false });
      }
    });
  }

  render() {
    const { component: RenderComponent, ...rest } = this.props;
    const { user, isLoading } = this.state;
    return (
      <>
        {isLoading ? (
          <Loading label="Authenticating..." hasBackdrop />
        ) : (
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
        )}
      </>
    );
  }
}
