require("dotenv").config();
require("express-async-errors");
const { connectDB } = require("./db/connectDB.js");
const express = require("express");
const startSocketIo = require("./socket.js");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));

// routers
const errorHandlerMiddleware = require("./middleware/error-handler.js");
const authRouter = require("./routes/auth.js");

app.use(express.static(__dirname + "/build"));
// routes
app.use("/api/auth", authRouter);
app.use(errorHandlerMiddleware);

app.get("*", (req, res) => {
  return res.sendFile(path.join(__dirname, "build", "index.html"));
});

const PORT = process.env.PORT || 8000;

const startExpressServer = () => {
  return app.listen(PORT, () =>
    console.log(`Express server listening on port ${PORT}`)
  );
};

connectDB(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to the DB");
    const expressServer = startExpressServer();
    startSocketIo(expressServer);
  })
  .catch((error) => {
    console.log("Error connecting to the database: ", error);
  });
