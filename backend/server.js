const express = require("express");
const cors = require("cors");
const dbConfig = require("./app/config/db.config");
const app = express();
const Routes = require('./app/routes/routes');

app.options('*', cors());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const mongoose = require('mongoose');


mongoose.connect(dbConfig.MONGODBURL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, }).then(() => {
  
   console.log("Successfully connected to the database");
}).catch(err => {
  console.log('Could not connect to the database. Exiting now...', err);
});

app.use('/', Routes);


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

