const request = require("request");
const geoCode = (location, callback) => {
  if (!location) {
    callback("please provide a valid location", undefined);
  }
  const GeoLocationUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    location
  )}.json?access_token=pk.eyJ1IjoiaGFyaXNoa3VtYXJmb3JldmVyIiwiYSI6ImNsMXd6bHJ6bTNjbnYza28yNjZoNXhmNXkifQ.k74kWAPo40IOxgc_qhhtLw&limit=1`;
  request({ url: GeoLocationUrl, json: true }, function (error, res, body) {
    if (error) {
      callback("something went wrong try again");
    } else if (body.features.length == 0) {
      callback("please seach with another location", undefined);
    } else {
      const lat = body.features[0].center[1];
      const long = body.features[0].center[0];
      const desc = body.features[0].place_name;
      callback(undefined, {
        long,
        lat,
        desc,
      });
    }
  });
};

// geoCode("Boston", (error, data) => {
//   if (error) {
//     console.log(error); 
//   } else {
//     console.log(data);
//   }
// });

module.exports = geoCode;

// const GeoLocationUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/India.json?access_token=pk.eyJ1IjoiaGFyaXNoa3VtYXJmb3JldmVyIiwiYSI6ImNsMXd6bHJ6bTNjbnYza28yNjZoNXhmNXkifQ.k74kWAPo40IOxgc_qhhtLw&limit=1`;

// request({ url: GeoLocationUrl, json: true }, function (error, res, body) {
//   if (error) {
//     console.log("something went wrong try again");
//   } else if (body.features.length == 0) {
//     console.log("please with another location");
//   } else {
//     console.log(body.features[0].center[0]);
//     console.log(body.features[0].center[1]);
//   }
// });
