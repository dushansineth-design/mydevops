// const express = require('express');
// const app = express();
// const homeRoute = require('./routes/home');

// //app.use('/api/home', require('./routes/home'));

const express = require("express");
const router = express.Router();


const authRoutes = require("./auth");
const homeRoutes = require("./home");


router.use("/auth", authRoutes);
router.use("/home", homeRoutes);


module.exports = router;