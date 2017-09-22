"use strict";

// Basic Express Setup
//--------------------
const PORT          = 8080;
const express       = require("express");
const bodyParser    = require("body-parser");
const app           = express();

// MongoDB Setup
//--------------
const MongoClient   = require("mongodb").MongoClient;
const MONGODB_URI   = "mongodb://localhost:27017/tweeter";

// Other Setups
//-------------
const sass = require("node-sass-middleware");

// Middleware
//-----------
app.use(sass({
  src: "server/sass",
  dest: "../public/styles",
  debug: true
})
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Start Server
//-------------
MongoClient.connect(MONGODB_URI,  (err, db) => {
  if (err) {
    console.error(`Failed to connect: ${MONGODB_URI}`);
    throw err;
  }
  console.log(`Connected to mongodb: ${MONGODB_URI}`);

  // Helper Functions
  //-----------------
  const DataHelpers = require("./lib/data-helpers.js")(db);
  const tweetsRoutes = require("./routes/tweets")(DataHelpers);
  
  // Routing
  //--------
  app.use("/tweets", tweetsRoutes);

  // Server Ready
  //-------------
  app.listen(PORT, () => {
    console.log("Example app listening on port " + PORT);
  });
});