const express = require("express");
const recipeRoutes = require("./modules/recipes/recipe.routes");
const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");
const requestLogger = require("./middleware/requestLogger");
const app = express();
app.use(requestLogger);
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Recipes API is running"
  });
});

app.use("/recipes", recipeRoutes);

// handle unknown routes
app.use(notFound);

// global error handler
app.use(errorHandler);

module.exports = app;