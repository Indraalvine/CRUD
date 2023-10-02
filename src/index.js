require("dotenv").config();
const express = require("express");
const cors = require("cors");
const PORT = process.env.SERVER_PORT || 3001;

const userRouter = require("./routes/usersRoute");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ origin: true, credentials: true }));

app.use("/newapi/users", userRouter);

app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});
