const request = require('request');

const geoCode = (address, callback) => {
  if (typeof (address) !== 'string')
    return console.log('Please provide a real location');

  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${process.env.MAPBOX_API_KEY}&limit=1`;

  request({ url, json: true }, (err, { body }) => {
    if (err) {
      callback('Unable to connect to the Mapbox services!');
    } else if (body.features.length === 0) {
      callback('Unable to find location.');
    }
    else {
      const longitude = body.features[0].center[0];
      const latitude = body.features[0].center[1];
      const location = body.features[0].place_name;
      callback(undefined, { latitude, longitude, location });
    }
  })
};

module.exports = geoCode;