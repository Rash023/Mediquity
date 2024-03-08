const express = require("express");
const app = express();

require("dotenv").config();

app.use(express.json());

const PORT = process.env.PORT || 3001;

require("./config/database").connect();
const route = require("./routes/routes");

app.use("/api/v1", route);

app.listen(PORT, () => {
  console.log(`App is running at ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("<h1> Hello baby</h1>");
});
