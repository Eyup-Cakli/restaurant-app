const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { connectMongoDb } = require("./config/connectMongoDB.js");
const authRoutes = require("./routes/authRoutes.js");
const { requireAuth, checkUser } = require("./middlewares/authMiddleware.js");

const app = express();
const port = 3000;

// middlewares
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());

// database connection
connectMongoDB();

// routes
app.get('*', checkUser);
app.use(authRoutes);

app.listen(port, () => {
    console.log(`listening on ${port}`)
});