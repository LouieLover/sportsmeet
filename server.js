const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
const mongoose = require("mongoose");
// const routes = require("./routes");
const todoRoutes = express.Router();

let Todo = require("./models/todo.model");
// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/reactrecipes",
  { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }
);

todoRoutes.route("/").get(function (req, res) {
  Todo.find(function (err, todos) {
    if (err) {
      console.log(err);
    } else {
      res.json(todos);
    }
  });
});

todoRoutes.route("/:id").get(function (req, res) {
  let id = req.params.id;
  Todo.findById(id, function (err, todos) {
    res.json(todos);
  });
});

todoRoutes.route("/:id").put(function (req, res) {
  console.log(req.params.id);
  Todo.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
  }).then((response) => {
    console.log(response);
    res.json(response);
  });
});

todoRoutes.route("/:id").delete(function (req, res) {
  console.log(req.params.id);
  Todo.findById({ _id: req.params.id })
    .then((dbModel) => dbModel.remove())
    .then((dbModel) => res.json(dbModel))
    .catch((err) => res.status(422).json(err));
});

todoRoutes.route("/add").post(function (req, res) {
  let todos = new Todo(req.body);
  todos
    .save()
    .then((todos) => {
      res.status(200).json({ todo: "todo added successfully" });
    })
    .catch((err) => {
      res.status(400).send("adding new todo failed");
    });
});

app.use("/todos", todoRoutes);
// Define API routes here
// app.use(routes);
// Send every other request to the React app
// Define any API routes before this runs
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
