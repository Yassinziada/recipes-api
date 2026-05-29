const recipeService = require("./recipe.service");
const asyncHandler = require("../../utils/asyncHandler");

/**
 * List all recipes.
 */
const listRecipes = asyncHandler(async (req, res) => {
  const result = await recipeService.getAllRecipes(req.query);

  res.json({
    success: true,
    data: result.data,
    meta: result.meta
  });
});

/**
 * Get one recipe by ID.
 */
const getRecipe = asyncHandler(async (req, res) => {
  const recipe = await recipeService.getRecipeById(req.params.id);

  res.json({
    success: true,
    data: recipe
  });
});

/**
 * Create a new recipe.
 */
const createRecipe = asyncHandler(async (req, res) => {
  const recipe = await recipeService.createRecipe(req.body);

  res.status(201).json({
    success: true,
    data: recipe
  });
});

/**
 * Update a recipe by ID.
 */
const updateRecipe = asyncHandler(async (req, res) => {
  const recipe = await recipeService.updateRecipe(req.params.id, req.body);

  res.json({
    success: true,
    data: recipe
  });
});

/**
 * Delete a recipe by ID.
 */
const deleteRecipe = asyncHandler(async (req, res) => {
  const deletedRecipe = await recipeService.deleteRecipe(req.params.id);

  res.json({
    success: true,
    message: "Recipe deleted successfully",
    data: deletedRecipe
  });
});

module.exports = {
  listRecipes,
  getRecipe,
  createRecipe,
  updateRecipe,
  deleteRecipe
};