// const mongoose = require("mongoose");
// const db = require("../models");

// // This file empties the Books collection and inserts the books below

// mongoose.connect(
//   process.env.MONGODB_URI ||
//   "mongodb://localhost/reactreadinglist"
// );

// const bookSeed = [
//   {
//     user: "The Dead Zone",
//     team: "Stephen King",

//     location: ""
//   },
//   {
//     user: "Lord of the Flies",
//     team: "William Golding",

//     location: ""
//   },
//   {
//     user: "The Catcher in the Rye",
//     team: "J.D. Salinger",

//     location: ""
//   },
//   {
//     user: "The Punch Escrow",
//     team: "Tal M. Klein",

//     location: ""
//   },
//   {
//     user: "Harry Potter and the Sorcerer's Stone",
//     team: "J.K. Rowling",

//     location: ""
//   },
//   {
//     user: "Coraline",
//     team: "Neil Gaiman",

//     location: ""
//   },
//   {
//     user: "Code: The Hidden Language of Computer Hardware and Software",
//     team: "Charles Petzold",

//       "What do flashlights, the British invasion, black cats, and seesaws have to do with computers? In CODE, they show us the ingenious ways we manipulate language and invent new means of communicating with each other. And through CODE, we see how this ingenuity and our very human compulsion to communicate have driven the technological innovations of the past two centuries. Using everyday objects and familiar language systems such as Braille and Morse code, team Charles Petzold weaves an illuminating narrative for anyone who’s ever wondered about the secret inner life of computers and other smart machines. It’s a cleverly illustrated and eminently comprehensible story—and along the way, you’ll discover you’ve gained a real context for understanding today’s world of PCs, digital media, and the Internet. No matter what your level of technical savvy, CODE will charm you—and perhaps even awaken the technophile within.",
//     location: ""
//   },
//   {
//     user: "The Everything Store: Jeff Bezos and the Age of Amazon",
//     team: "Brad Stone",

//     location: ""
//   },
//   {
//     user: "Total Recall: My Unbelievably True Life Story",
//     team: "Arnold Schwarzenegger",

//     location: ""
//   },
//   {
//     user: "Elon Musk: Tesla, SpaceX, and the Quest for a Fantastic Future",
//     team: "Ashlee Vance",

//     location: ""
//   },
//   {
//     user: "Steve Jobs",
//     team: "Walter Isaacson",

//     location: ""
//   },
//   {
//     user: "Astrophysics for People in a Hurry",
//     team: "Neil deGrasse Tyson",

//     location: ""
//   },
//   {
//     user: "1984",
//     team: "George Orwell",

//     location: ""
//   },
//   {
//     user: "Frankenstein",
//     team: "Mary Shelley",

//     location: ""
//   },
//   {
//     user: "The Great Gatsby",
//     team: "F. Scott Fitzgerald",

//     location: ""
//   },
//   {
//     user: "Born a Crime: Stories from a South African Childhood",
//     team: "Trevor Noah",

//     location: ""
//   }
// ];

// db.Team
//   .remove({})
//   .then(() => db.Book.collection.insertMany(bookSeed))
//   .then(data => {
//     console.log(data.result.n + " records inserted!");
//     process.exit(0);
//   })
//   .catch(err => {
//     console.error(err);
//     process.exit(1);
//   });
