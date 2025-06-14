const db = require("./db");

async function existingUser(email) {
  try {
    const [user] = await db.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    return user[0] || null;
  } catch (error) {
    return null;
  }
}

async function addNewUser(name, email, password) {
  try {
    const [add] = await db.query(
      "INSERT INTO users (userName, email, userPassword) VALUES (?, ?, ?) ",
      [name, email, password]
    );

    return {
      status: true,
      data: { userID: add.insertId, userName: name, email },
    };
  } catch (error) {
    return { status: false, message: "DB Error" };
  }
}

module.exports = { existingUser, addNewUser };
