const mongoose = require(`mongoose`);
const Client = require(`./models/client.model`);
const data = require("./data");
//ESTABLISH THE CONNECTION FOR THE WHOLE APP THROUGH MONGOOSE CONNECT
//ONCE DONE YOU ONLY NEED TO IMPORT IT TO WHICH EVER FILE YOU NEED IT IN
mongoose
  .connect("mongodb://localhost:27017/mongoose-crud", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  // returns a promise, so no semicolon
  .then(() => {
    // let us know the connection was successfull
    console.log("DB connection established successfully!");
    return mongoose.connection.db.dropDatabase();
  })
  .then(() => {
    const client1 = {
      name: "Bob",
      age: 25,
      accountActive: true,
      balance: 31000,
      payments: [],
    };
    // Create this client
    return Client.create(client1);
  })
  .then((createdClient) => {
    console.log("Created Client:", createdClient);
    return Client.findById(createdClient._id);
  })
  .then((retrievedClient) => {
    console.log("Retrieved Client:", retrievedClient);

    const pr = Client.insertMany(data);
    return pr;
  })
  .then((createdClients) => {
    const pr = Client.find({ name: "Hoover Goodman" });
    // returns an array
    return pr;
  })
  .then((foundClient) => {
    console.log("Found Client:", foundClient);

    //UPDATE
    const pr = Client.findByIdAndUpdate(
      foundClient[0]._id,
      {
        name: "Ana Banana",
        payments: [{ amount: 500 }, { amount: 1000 }],
      },
      { new: true }
    );
    return pr;
  })
  .then((updated) => {
    console.log("Updated info:", updated);

    // DELETE
    const pr = Client.deleteOne({ name: "Maddox Leon" }); // this will return the status of this id, in this case since it has been deleted it will be a deleted status
    return pr;
  })
  .then((result) => {
    console.log("The status is:", result);
  })
  .catch((err) => {
    console.log("There was an error:", err);
  });
