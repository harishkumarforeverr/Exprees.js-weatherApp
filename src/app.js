const express = require("express");
const path = require("path");
const hbs = require("hbs");
const geoCode = require("./utils/geocode.js");
const forecast = require("./utils/forecast.js");
const app = express();
const port = process.env.PORT || 9999;
// setting the paths
const publicPath = path.join(__dirname, "..", "public");
const ViewsPaths = path.join(__dirname, "..", "templates/views");
const hbsPartials = path.join(__dirname, "..", "templates/hbs");

// set the handle Bars and seting the views foldders
app.set("view engine", "hbs");
app.set("views", ViewsPaths);
hbs.registerPartials(hbsPartials);

// serving the static files
app.use(express.static(publicPath));

// all the gets requests
app.get("", (req, res) => {
  res.render("index", {
    name: "harish",
    age: "21",
    createdBy: "index harish",
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    name: "seenu",
    age: "21",
    createdBy: "help harish",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    name: "satish",
    age: "21",
    createdBy: "about harish",
  });
});

app.get("/weather", (req, res) => {
  console.log(req.query);
  if (!req.query.address) {
    return res.send({
      error: "please provide a address",
    });
  }
  geoCode(req.query.address, (error, { long, lat, desc } = {}) => {
    if (error) {
      return res.send({ error });
    }
    console.log(long, lat, desc);
    forecast(long, lat, (err, forcastData) => {
      // console.log(err, forcastData);
      if (err) {
        return res.send({ err });
      }
      res.send({
        forcast: forcastData,
        describtion: desc,
        address: req.query.address,
      });
    });
  });
});
// app.get("/products", (req, res) => {
//   console.log(req.query);
//   const { query } = req;
//   if (!query.name) {
//     return res.send({
//       error: "please provide name",
//     });
//   }
//   res.send({
//     products: [],
//   });
// });
app.get("/help/*", (req, res) => {
  res.render("helpNotFound");
});
app.get("*", (req, res) => {
  res.render("NotFound");
});
app.listen(port, () => {
  console.log(`server as started at  ${port}`);
});
