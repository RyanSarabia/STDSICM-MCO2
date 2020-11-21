/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React, { Component } from 'react';
import { Redirect, Route } from 'react-router-dom';
import axios from 'axios';

export default class ProtectedRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: false,
    };
  }

  componentDidMount() {
    axios.get('/validate').then((res) => {
      console.log('check session');
      if (res.data === 'Has Session') {
        this.setState({ user: true });
      } else {
        this.setState({ user: false });
      }
    });
  }

  render() {
    const { component: RenderComponent, ...rest } = this.props;
    const { user } = this.state;
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
}
