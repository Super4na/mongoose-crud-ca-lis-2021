const mongoose = require(`mongoose`);
const Client = require(`./models/client.model`);
const data = require("./data");
//ESTABLISH THE CONNECTION FOR THE WHOLE APP THROUGH MONGOOSE CONNECT
//ONCE DONE YOU ONLY NEED TO IMPORT IT TO WHICH EVER FILE YOU NEED IT IN

async function runCode() {
  try {
    await mongoose.connect("mongodb://localhost:27017/mongoose-crud", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("DB connection established successfully!");

    await mongoose.connection.db.dropDatabase();

    const client1 = {
      name: "Bob",
      age: 25,
      accountActive: true,
      balance: 31000,
      payments: [],
    };

    const newClient = await Client.create(client1);
    console.log(newClient);

    const newClients = await Client.insertMany(data);

    console.log(newClients);

    const searchingClient = await Client.find({ name: "Hoover Goodman" });
    console.log("Searching Client:", searchingClient);

    const updatedClient = await Client.findByIdAndUpdate(
      searchingClient[0]._id,
      {
        name: "Ana Banana",
        payments: [{ amount: 500 }, { amount: 1000 }],
      },
      { new: true }
    );

    console.log("Updated Client:", updatedClient);

    const deleteClient = await Client.deleteOne({ name: "Maddox Leon" });
    console.log("The status is:", deleteClient);

    const pr = await mongoose.connection.close();
    console.log("Connection has been closed");
  } catch (e) {
    console.log("There was an error:", e);
  }
}

runCode();
