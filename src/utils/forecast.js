const request = require('request');

const forecast = (latitude, longitude, callback) => {
  const url = `https://api.darksky.net/forecast/0972c32a765ede61de8c376eb797f3d3/${latitude},${longitude}?units=si`;

  request({ url, json: true }, (err, { body }) => {
    if (err) {
      callback('Unable to connect to the weather services!');
    } else if (body.error) {
      callback('Unable to find location');
    }
    else {
      callback(undefined, {
        summary: body.daily.data[0].summary,
        temperature: body.currently.temperature,
        rainChance: body.currently.precipProbability
      });
    }
  })
};

module.exports = forecast;