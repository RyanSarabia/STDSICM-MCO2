// eslint-disable-next-line import/no-mutable-exports
let URLs = {};

if (process.env.NODE_ENV === 'production') {
  URLs = {
    baseURL: '',
    socketURL: 'http://lasellplus.herokuapp.com',
  };
} else {
  URLs = {
    baseURL: 'http://localhost:3000',
    socketURL: 'http://localhost:4000',
  };
}

export default URLs;
