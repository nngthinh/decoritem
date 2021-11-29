// import { connect } from "mongoose";
// import { winston } from "./app/config";
// import app from "./app/app";
// import { createServer } from "https";
// import { readFileSync } from "fs";

const mongoose = require("mongoose");
const app = require("./app.js")

mongoose.connect(process.env.MONGO_URI, {
  // replicaSet: "rs0",
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  autoIndex: false,
  serverSelectionTimeoutMS: 15000,
})
  .then(() => {
    //winston.info("MongoDB Connected ...");
    console.log("MongoDB Connected ...");
  })
  .catch((err) => //winston.error(err)
  console.error(err)
  );

let port = process.env.PORT || 9000;

let server = app;
if (process.env.NODE_ENV === "Production") {
  // const httpsOptions = {
  //   key: readFileSync(
  //     "/etc/letsencrypt/live/api.credential.asia/privkey.pem",
  //     "utf8"
  //   ),
  //   cert: readFileSync(
  //     "/etc/letsencrypt/live/api.credential.asia/cert.pem",
  //     "utf8"
  //   ),
  //   ca: readFileSync(
  //     "/etc/letsencrypt/live/api.credential.asia/chain.pem",
  //     "utf8"
  //   ),
  // };
  // server = createServer(httpsOptions, app);
}

server.listen(port, () => {
  //winston.info(`Server listening on port ${port}`);
  console.log(`Server listening on port ${port}`);
});
server.on("error", (error) => {
  //winston.error("Error: ", error);
  console.error(error)
});
