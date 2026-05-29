const recipeRepository = require("./recipe.repository");
const ApiError = require("../../utils/ApiError");

/**
 * Get all recipes with optional search and pagination.
 * @param {Object} query - Query parameters.
 * @returns {Promise<Object>} Paginated recipes result.
 */
async function getAllRecipes(query = {}) {
  return recipeRepository.findAll({
    search: query.search,
    page: query.page,
    limit: query.limit
  });
}

/**
 * Get a single recipe by ID.
 * @param {string} id - Recipe UUID.
 * @throws {ApiError} If recipe is not found.
 * @returns {Promise<Object>} Recipe object.
 */
async function getRecipeById(id) {
  const recipe = await recipeRepository.findById(id);

  if (!recipe) {
    throw new ApiError(404, "Recipe not found");
  }

  return recipe;
}

/**
 * Create a new recipe.
 * @param {Object} data - Recipe data.
 * @param {string} data.name - Recipe name.
 * @param {string} data.ingredients - Recipe ingredients.
 * @returns {Promise<Object>} Created recipe.
 */
async function createRecipe(data) {
  return recipeRepository.create(data);
}

/**
 * Update a recipe by ID.
 * @param {string} id - Recipe UUID.
 * @param {Object} data - Updated recipe data.
 * @throws {ApiError} If recipe is not found.
 * @returns {Promise<Object>} Updated recipe.
 */
async function updateRecipe(id, data) {
  const updatedRecipe = await recipeRepository.update(id, data);

  if (!updatedRecipe) {
    throw new ApiError(404, "Recipe not found");
  }

  return updatedRecipe;
}

/**
 * Delete a recipe by ID.
 * @param {string} id - Recipe UUID.
 * @throws {ApiError} If recipe is not found.
 * @returns {Promise<Object>} Deleted recipe.
 */
async function deleteRecipe(id) {
  const deletedRecipe = await recipeRepository.remove(id);

  if (!deletedRecipe) {
    throw new ApiError(404, "Recipe not found");
  }

  return deletedRecipe;
}

module.exports = {
  getAllRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe
};