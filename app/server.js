const express = require("express");
const app = express();
const cors = require("cors");
const connectionToDB = require("./db/connection");
const userRoutes = require("./router/userRouter");
const donationRoutes = require("./router/donationRouter");
const fundraisingRoutes = require("./router/fundraisingRouter");
const fundTransactionRoutes = require("./router/fundTransactionRouter");
const donationTransactionRoutes = require("./router/donationTransactionRouter");
const allTransactionRoutes = require("./router/allTransactionRouter");

const port = 5001;

//Middleware
app.use(
  cors({
    origin: "*", // Or a safer domain if needed
    credentials: true,
  })
);
app.use(express.json());

connectionToDB();

app.use("/api", userRoutes);
app.use("/api", donationRoutes);
app.use("/api", fundraisingRoutes);
app.use("/api", fundTransactionRoutes);
app.use("/api", donationTransactionRoutes);
app.use("/api", allTransactionRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

if (process.env.NODE_ENV !== 'production') {
  const port = process.env.PORT || 5002;
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  })
}
module.exports = app