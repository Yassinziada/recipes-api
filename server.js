const express = require("express");

const app = express();

app.use(express.json());

// temporary fake database
let recipes = [];

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Recipes API is running"
  });
});

app.get("/recipes", (req, res) => {
  res.json({
    success: true,
    data: recipes
  });
});

app.post("/recipes", (req, res) => {
  const { name, ingredients } = req.body;

  const newRecipe = {
    id: recipes.length + 1,
    name,
    ingredients
  };

  recipes.push(newRecipe);

  res.status(201).json({
    success: true,
    data: newRecipe
  });
});

app.get("/recipes/:id", (req, res) => {
  const id = Number(req.params.id);

  const recipe = recipes.find((item) => item.id === id);

  if (!recipe) {
    return res.status(404).json({
      success: false,
      message: "Recipe not found"
    });
  }

  res.json({
    success: true,
    data: recipe
  });
});

app.patch("/recipes/:id", (req, res) => {
  const id = Number(req.params.id);
  const { name, ingredients } = req.body;

  const recipe = recipes.find((item) => item.id === id);

  if (!recipe) {
    return res.status(404).json({
      success: false,
      message: "Recipe not found"
    });
  }

  if (name !== undefined) {
    recipe.name = name;
  }

  if (ingredients !== undefined) {
    recipe.ingredients = ingredients;
  }

  res.json({
    success: true,
    data: recipe
  });
});
app.delete("/recipes/:id", (req, res) => {
  const id = Number(req.params.id);

  const recipeIndex = recipes.findIndex((item) => item.id === id);

  if (recipeIndex === -1) {
    return res.status(404).json({
      success: false,
      message: "Recipe not found"
    });
  }

  const deletedRecipe = recipes.splice(recipeIndex, 1)[0];

  res.json({
    success: true,
    message: "Recipe deleted successfully",
    data: deletedRecipe
  });
});
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});