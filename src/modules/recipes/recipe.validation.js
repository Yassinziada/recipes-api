const { z } = require("zod");

const recipeIdParamSchema = z.object({
  params: z.object({
    id: z.string().uuid("Invalid recipe ID format")
  })
});

const createRecipeSchema = z.object({
  body: z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    ingredients: z.string().min(3, "Ingredients must be at least 3 characters")
  })
});

const updateRecipeSchema = z.object({
  params: z.object({
    id: z.string().uuid("Invalid recipe ID format")
  }),
  body: z.object({
    name: z.string().min(2, "Name must be at least 2 characters").optional(),
    ingredients: z.string().min(3, "Ingredients must be at least 3 characters").optional()
  })
});

module.exports = {
  recipeIdParamSchema,
  createRecipeSchema,
  updateRecipeSchema
};