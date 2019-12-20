const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const express = require('express');
const { database } = require('./Config/Mongoodb/mongoodb');
const { port } = require('./Config/Config/config');
const app = express();
require('./Config/Auth/Security/passport');
const passport = require('passport');
const passportLogin = passport.authenticate('jwt', { session: false });

// Koneksi Ke Mongoodb
mongoose.connect(database, { useNewUrlParser: true }, err => {
  if (err) {
    console.log(err);
  } else {
    console.log('Connected to the database');
  }
});

// Definisi Route
const AccountRoutes       = require('./Route/account');
const LoginRoutes         = require('./Route/login');
const ProfileRoutes       = require('./Route/profile');
const ProductRoutes       = require('./Route/product');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(cors());

app.get('/',(req,res)=>{
    res.send({'version App ': '1.0'});
});

// Route tanpa permission dan cek jwt
app.use('/api-login', LoginRoutes);
app.use('/api-accounts', AccountRoutes);
app.use('/api-products', ProductRoutes);

// Cek JWT
app.use(passportLogin,(req, res, next)=>{
	  res.setHeader('Access-Control-Allow-Origin', "*");
  	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type','Authorization',' Accept');
    req.decoded = req.user;
  	next();
});

// Route cek Permission & Hak akses
app.use('/api-profile', ProfileRoutes);

app.listen(port, err => {
    console.log('Magic happens on port awesome ' + port);
});

module.exports=app;