const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
const mongoose = require("mongoose");
// const routes = require("./routes");
const teamRoutes = express.Router();
const userRoutes = express.Router();
const axios = require("axios");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

let Team = require("./models/team.model");
let user = require("./models/user");
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

userRoutes.route("/").get(function (req, res) {
  user.findById(function (err, user) {
    res.json({
      displayName: user.displayName,
      id: user._id,
    });
  });
});

userRoutes.route("/register").post(function (req, res) {
  user.find(function (err, user) {
    try {
      let { username, password } = req.body;
      // validate
      if (!username || !password)
        return res
          .status(400)
          .json({ msg: "Not all fields have been entered." });
      if (password.length < 5)
        return res.status(400).json({
          msg: "The password needs to be at least 5 characters long.",
        });

      const existingUser = user.findOne({ username: username });
      if (existingUser)
        return res
          .status(400)
          .json({ msg: "An account with this username already exists." });

      const salt = bcrypt.genSalt();
      const passwordHash = bcrypt.hash(password, salt);

      const newUser = new User({
        username: "",
        password: passwordHash,
      });
      const savedUser = newUser.save();
      res.json(savedUser);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
});

userRoutes.route("/login").post(function (req, res) {
  user.find(function (err, user) {
    try {
      const { username, password } = req.body;
      if (!username || !password)
        return res.status(400).json({ msg: "Fill the form out buddy." });

      const user = User.findOne({ username: username });
      if (!user)
        return res
          .status(400)
          .json({ msg: "No account with this username has been registered." });

      const isMatch = bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({ msg: "Invalid credentials." });

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      res.json({
        token,
        user: {
          id: user._id,
          displayName: user.displayName,
        },
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
});

userRoutes.route("/tokinIsValid").post(function (req, res) {
  user.find(function (err, user) {
    try {
      const token = req.header("x-auth-token");
      if (!token) return res.json(false);

      const verified = jwt.verify(token, process.env.JWT_SECRET);
      if (!verified) return res.json(false);

      const user = user.findById(verified.id);
      if (!user) return res.json(false);

      return res.json(true);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
});

userRoutes.route("/:id").delete(function (req, res) {
  console.log(req.params.id);
  user
    .findById({ _id: req.params.id })
    .then((dbModel) => dbModel.remove())
    .then((dbModel) => res.json(dbModel))
    .catch((err) => res.status(422).json(err));
  try {
    const deletedUser = user.findByIdAndDelete(req.user);
    res.json(deletedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.use("/teams", teamRoutes, userRoutes);
app.use("/user", userRoutes);
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
