require("dotenv").config();

const { existingUser, addNewUser } = require("../data-access-layer/Auth-DAL");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function SignIn(name, email, password) {
  try {
    const isExisting = await existingUser(email);

    if (isExisting !== null) {
      return { status: false, message: "User already exists" };
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const add = await addNewUser(name, email, hashedPassword);

    if (!add.status) {
      return { status: false, message: "Failed to create user" };
    }

    return {
      status: true,
      data: add.data,
      token: jwt.sign(
        {
          email: email,
          userID: add.userID,
          userName: name,
        },
        process.env.SECRET_KEY,
        { expiresIn: "30m" }
      ),
    };
  } catch (error) {
    return {
      status: false,
      message: "Internal server error",
      token: jwt.sign({ ...add.data }, process.env.SECRET_KEY, {
        expiresIn: "30m",
      }),
    };
  }
}

async function LogIn(email, password) {
  try {
    const user = await existingUser(email);

    if (user === null) {
      return { status: false, message: "Incorrect password or email" };
    }

    const passwordMatch = bcrypt.compareSync(password, user.userPassword);

    if (!passwordMatch) {
      return { status: false, message: "Incorrect password or email" };
    }

    return {
      status: true,
      data: {
        email: user.email,
        userID: user.userID,
        userName: user.userName,
      },
      token: jwt.sign(
        {
          email: user.email,
          userID: user.userID,
          userName: user.userName,
        },
        process.env.SECRET_KEY,
        { expiresIn: "30m" }
      ),
    };
  } catch (error) {
    return { status: false, message: "Internal server error" };
  }
}

module.exports = { SignIn, LogIn };
