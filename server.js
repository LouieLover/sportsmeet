const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
const mongoose = require("mongoose");
// const routes = require("./routes");
const teamRoutes = express.Router();
const axios = require("axios");

let Team = require("./models/team.model");
// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/sportsmeet", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
});

teamRoutes.route("/").get(function (req, res) {
  Team.find(function (err, teams) {
    if (err) {
      console.log(err);
    } else {
      res.json(teams);
    }
  });
});

teamRoutes.route("/:id").get(function (req, res) {
  let id = req.params.id;
  Team.findById(id, function (err, teams) {
    res.json(teams);
  });
});

teamRoutes.route("/:id").put(function (req, res) {
  console.log(req.params.id);
  Team.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
  }).then((response) => {
    console.log(response);
    res.json(response);
  });
});

teamRoutes.route("/:id").delete(function (req, res) {
  console.log(req.params.id);
  Team.findById({ _id: req.params.id })
    .then((dbModel) => dbModel.remove())
    .then((dbModel) => res.json(dbModel))
    .catch((err) => res.status(422).json(err));
});

teamRoutes.route("/add").post(function (req, res) {
  axios
    .get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${req.body.location}&key=AIzaSyBVMzrG2VGR9n61ElBUaECsWbrcjZQeLB8`
    )
    .then((response) => {
      req.body.coords = response.data.results[0].geometry.location;
      let team = new Team(req.body);
      team
        .save()
        .then((team) => {
          res.status(200).json({ team: "team added successfully" });
        })
        .catch((err) => {
          res.status(400).send("adding new team failed");
        });
    })
    .catch((err) => console.log(err));
});

app.use("/teams", teamRoutes);
// Define API routes here
// app.use(routes);
// Send every other request to the React app
// Define any API routes before this runs
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "./client/build/index.html"));
// });

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
