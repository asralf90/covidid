const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const customerSchema = Schema({
  _id: Schema.Types.ObjectId,
  fullname: {
    type: String,
  },
  phone: {
    type: String,
  },
  address: {
    type: String,
  },
  // dateofbirth: {
  //   type: String,
  //   // required: true,
  // },
  updated: { type: Date, default: Date.now },
  adminId: { type: String, required: true },
});

customerSchema.pre("save", function (next) {
  next();
});

const Customer = mongoose.model("customer", customerSchema);

module.exports = Customer; //single export
