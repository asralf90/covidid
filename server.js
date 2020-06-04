require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./express");
const PORT = process.env.PORT || 5000;
// const server = process.env.MONGOURI;
//const database = "userDB";

//connecting to mongodb using mongoose
// mongoose.connect(`mongodb://${server}/${database}`, {
mongoose.connect(process.env.MONGOURI2, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

//when connected, logs result
mongoose.connection.on("connected", () => {
  console.log("Connected to database");
});

//server port
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
