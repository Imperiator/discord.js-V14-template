const mongoose = require('mongoose');
const {mongoUrl} = require('./constants');
module.exports = {
  connectMongo: async() => {
    if (mongoose.connection.readyState >= 1) return;
    if(!mongoUrl) throw new Error('No mongo url provided');
       await mongoose.connect(mongoUrl, {
              useNewUrlParser: true,
                useUnifiedTopology: true,
       });

       mongoose.connection
  .on("open", () => {
    console.log("Connected to MongoDB");
  })
  .on("error", (err) => {
    console.log(err);
  })
  .on("disconnected", () => {
    console.log("Disconnected from MongoDB");
  })
  .on("close", () => {
    console.log("Disconnected from MongoDB");
  })
  .on("reconnected", () => {
    console.log("Reconnected to MongoDB");
  })
  .on("reconnectFailed", () => {
    console.log("Reconnect failed to MongoDB");
  })
  .on("reconnecting", () => {
    console.log("Reconnecting to MongoDB");
  })
  .on("disconnecting", () => {
    console.log("Disconnecting from MongoDB");
  });
    }
}