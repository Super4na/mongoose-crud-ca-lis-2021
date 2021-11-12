const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const payment = require("./../schemas/payment.schema");

// create a schema
const clientSchema = new Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  accountActive: { type: Boolean, default: true },
  balance: { type: Number, required: true },
  payments: {
    type: [payment],
  },
});

// create a model and pass it the schema
const Client = mongoose.model(`Client`, clientSchema);

//export the model
module.exports = Client;
