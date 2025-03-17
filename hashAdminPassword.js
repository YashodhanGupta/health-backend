const bcrypt = require("bcryptjs");

async function hashPassword() {
  const password = "Admin@123"; // Plain text password
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("Hashed Password:", hashedPassword);
}

hashPassword();
