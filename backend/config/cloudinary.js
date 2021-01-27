const cloudinary = require('cloudinary');

cloudinary.config({
  cloud_name: 'lasell2',
  api_key: '333571364327867',
  api_secret: '8BvyYKkstiDxIDLfJ-usxrSqz5U',
});

exports.uploads = (file) => {
  return new Promise((resolve) => {
    cloudinary.uploader.upload(
      file,
      (result) => {
        resolve({ url: result.url, id: result.public_id });
      },
      { resource_type: 'auto' }
    );
  });
};
