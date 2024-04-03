// importing required library
const express = require("express");
const cors = require("cors");

// creating the app instance
const app = express();

// setting cors options
const corsOptions = {
  origin: "*",
};
app.use(cors(corsOptions));

// parse request for content-type: application/json
app.use(express.json());

// parse request for content-type: application/x-www-form-urlEncoded
app.use(express.urlencoded({ extended: true }));

// Database configuration
const db = require("./models");
const dbConfig = require("./config/db.config");
const Role = db.role;
const dbUrl = `mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`;
db.mongoose
  .connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connection successfully established.");
    initial();
  })
  .catch((err) => {
    console.log("Error connecting to mongodb: ", err);
    process.exit();
  });

// initialize Roles collection on DB
function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user",
      }).save((err) => {
        if (err) {
          console.log("User role not created,".err);
        }
        console.log("added 'user' to role collection");
      });

      new Role({
        name: "moderator",
      }).save((err) => {
        if (err) {
          console.log("role 'moderator' not created,".err);
        }
        console.log("added 'moderator' to role collection");
      });

      new Role({
        name: "admin",
      }).save((err) => {
        if (err) {
          console.log("role 'admin' not created,".err);
        }
        console.log("added 'admin' to role collection");
      });
    }
  });
}

// demo route to check if server is up and running
app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello Express App" });
});

// Main App routes
require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);

// set port and listen to port number
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is up and running at PORT: ${PORT}`);
});
