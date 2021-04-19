const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require("path");
require('./config/passport');


const app = express();

mongoose.connect("mongodb://dogrob96:Big#1234@192.168.1.14/intellihr?authSource=admin&w=1", { useNewUrlParser: true, useUnifiedTopology: true});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use(session({ secret: 'aperture-science-enrchment-centre', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));

app.use(require('./routes'));

app.use(express.static(path.join(__dirname, "..", "build")));
app.use(express.static("public"));

app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, "..", "build", "index.html"));
  });

app.listen(3001, () => {
    console.log('Listening on port 3001');
}); 