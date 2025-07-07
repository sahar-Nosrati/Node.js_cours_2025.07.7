const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const PORT = process.env.port || 6500;
const { logger, logEvent } = require("./middleware/logEvent");
const erroHandler = require("./middleware/errorHndler");
const corsOptions = require("./config/corseOptions").default;
// custon middleware logger
app.use(logger);
app.use(cors(corsOptions));

// apply middleware and handle url in form data
app.use(express.urlencoded({ extended: false })); // write before all rouths, apply for all rouths

//apply middleware for JSON data
app.use(express.json());

// serve static files
app.use("/", express.static(path.join(__dirname, "./public")));

app.use("/", require("./Route/root"));
app.use("/employee", require("./Route/root"));
app.use("/employee", require("./Route/api/employee"));

// // routh handeler
// app.get(
//   "/hello(.html)?",
//   (req, res, next) => {
//     console.log("Try to load hello.html");
//     next();
//   },
//   (req, res) => {
//     res.send("Hello world, Hello Sahar");
//   }
// );

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 not found" });
  } else {
    res.type("txt").send("404 not found");
  }
});

app.use(erroHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
