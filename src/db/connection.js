const mongoose = require("mongoose");

async function ConnectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("MongoDB is on rock....");
  } catch (err) {
    console.log(err.message);
  }
}

ConnectDB();
