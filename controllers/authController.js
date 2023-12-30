const jwt = require("jsonwebtoken");
const fs = require("fs");
const user = require("../models/concrete/user.js");

const privateKey = fs.readFileSync("./certs/private.pem");
const publicKey = fs.readFileSync("./certs/public.pem");

// handle errors
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: "", password: "" };

  // incorrect password
  if (err.message === "incorrect email or password.") {
    errors.password = "password or email is incorrect";
    return errors;
  }

  if (err.message === "incorrect password or email.") {
    errors.email = "password or email is incorrect";
    return errors;
  }

  // duplicate error code => email
  if (err.code === 11000) {
    if (err.keyPattern && err.keyPattern.email) {
      errors.email = "that email is already registered";
    }
    return errors;
  }

  // validation errors
  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  errors.generic = "An error occured. please try again";
  return errors;
};

// generate token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, privateKey, {
    expiresIn: maxAge,
    algorithm: "RS256",
  });
};

// register operation
const signup_post = async (req, res) => {
  try {

      const email = req.body.email;
      const password = req.body.password;
      const username = req.body.username;

      const newUser = new user({
        email: email,
        password: password,
        username: username
      });

      try {
        const savedUser = await newUser.save();
        const token = createToken(savedUser._id);
        res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
        return res.status(200).json({ user: savedUser, token: token });
      } catch (err) {
        if (err.code === 11000 && err.keyValue && err.keyValue.email) {
          return res
            .status(400)
            .json({ error: "This email is already registered." });
        } else {
          return res
            .status(500)
            .json({ error: "An error occurred while creating the user." });
        }
      }
  } catch (err) {
    return res.status(500).json({ error: "An error occurred." });
  }
};

// login operation
const login_post = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const user = await user.login(email, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    await user.updateOne({ status: true });
    res.status(200).json({ user: user._id, token: token });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

// logout operations | end session
const logout_get = async (req, res) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      res.locals.user = null;
      return res.redirect("/");
    } else {
      console.log("Token : " + token);
      const decodedToken = jwt.verify(token, publicKey);
      const userId = decodedToken.id;
      const user = await user.findById(userId);
      await user.updateOne({ status: false });

      res.cookie("jwt", "", { maxAge: 1 });
      res.redirect("/");
    }
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

module.exports = { signup_post, login_post, logout_get };