const request = require("request");

const forecast = (long, lat, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=30d19ede3d3503b981c86d9c759deba5&query=${long},${lat}&units=f`;
  request({ url, json: true }, function (error, response, body) {
    const Obj = body.current;
    // console.log(error, body);
    if (error) {
      callback("something went wrong try again", undefined);
    } else if (body.error) {
      callback("please search with another loc and latitude", undefined);
    } else {
      callback(
        undefined,
        `${Obj.weather_descriptions}. the temperature is ${Obj.temperature} now and its feek like ${Obj.feelslike}`
      );
    }
  });
};

// forecast(-71.0596, 42.3605, (error, data) => {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log(data);
//   }
// });
module.exports = forecast;
// const url = `http://api.weatherstack.com/current?access_key=30d19ede3d3503b981c86d9c759deba5&query=40.714,-74.006&units=f`;
// request({ url, json: true }, function (error, response, body) {
//   const Obj = body.current;
//   if (error) {
//     console.log("something went wrong try again");
//   } else if (body.error) {
//     console.log("please search with another loc and latitude");
//   } else {
//     console.log(
//       `${Obj.weather_descriptions}. the temperature is ${Obj.temperature} now and its feek like ${Obj.feelslike}`
//     );
//   }
// });
