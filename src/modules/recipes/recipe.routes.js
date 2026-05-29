const express = require("express");
const recipeController = require("./recipe.controller");
const validate = require("../../middleware/validate");
const {
  recipeIdParamSchema,
  createRecipeSchema,
  updateRecipeSchema
} = require("./recipe.validation");

const router = express.Router();

router.get("/", recipeController.listRecipes);

router.post("/", validate(createRecipeSchema), recipeController.createRecipe);

router.get("/:id", validate(recipeIdParamSchema), recipeController.getRecipe);

router.patch("/:id", validate(updateRecipeSchema), recipeController.updateRecipe);

router.delete("/:id", validate(recipeIdParamSchema), recipeController.deleteRecipe);

module.exports = router;