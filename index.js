const Express = require("express");
const app = Express();
const cors = require("cors");
const morgan = require("morgan");
const { Sequelize } = require("sequelize");

const { port } = require("./config");
const PORT = process.env.PORT || port;

// Express Routes Import
const CustomerRoutes = require("./cutomers/routes");
const BookRoutes = require("./books/routes");

// Sequelize model imports
const CustomerModel = require("./common/models/Customer");
const BookModel = require("./common/models/Book");

app.use(morgan("tiny"));
app.use(cors());

// Middleware that parses the body payloads as JSON to be consumed next set
// of middlewares and controllers.
app.use(Express.json());

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./storage/data.db", // Path to the file that will store the SQLite DB.
});

// Initialising the Model on sequelize
CustomerModel.initialise(sequelize);
BookModel.initialise(sequelize);

// Syncing the models that are defined on sequelize with the tables that alredy exists
// in the database. It creates models as tables that do not exist in the DB.
sequelize
  .sync()
  .then(() => {
    console.log("Sequelize Initialised!!");

    // Attaching the Authentication and User Routes to the app.
    app.use("/customers", CustomerRoutes);
    app.use("/books", BookRoutes);

    app.listen(PORT, () => {
      console.log("Server Listening on PORT:", port);
    });
  })
  .catch((err) => {
    console.error("Sequelize Initialisation threw an error:", err);
  });
