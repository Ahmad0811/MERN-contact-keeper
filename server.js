const express = require("express");
const connectDB = require("./config/db");
const path = require("path");
require("dotenv").config({ path: ".env" });

const app = express();

//Connect DataBase
connectDB();
// console.log(process.env);
//Init Middleware
app.use(express.json({ extended: false }));

//Define Routes
app.use("/api/users", require("./routes/users"));
app.use("/api/contacts", require("./routes/contacts"));
app.use("/api/auth", require("./routes/auth"));

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`Server is running on port: ${PORT}`);
});
