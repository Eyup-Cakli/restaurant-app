const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { connectMongoDB } = require("./config/connectMongoDB.js");
const authRoutes = require("./routes/authRoutes.js");
const { requireAuth, checkUser } = require("./middlewares/authMiddleware.js");
const userRoutes = require("./routes/userRoutes.js");
const companyRoutes = require("./routes/companyRoutes.js");
const menuRoutes = require("./routes/menuRoutes.js");
const commentRoutes = require("./routes/commentRoutes.js");
const addressRoutes = require("./routes/addressRoutes.js");
const orderRoutes = require("./routes/orderRoutes.js");
const restaurantRoutes = require("./routes/restaurantRoutes.js")

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
app.use(userRoutes);
app.use(companyRoutes);
app.use(menuRoutes);
app.use(commentRoutes);
app.use(addressRoutes);
app.use(orderRoutes);
app.use(restaurantRoutes);

app.listen(port, () => {
    console.log(`listening on ${port}`)
});