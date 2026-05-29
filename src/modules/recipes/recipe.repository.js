const supabase = require("../../config/supabase");

/**
 * Get all recipes with optional search and pagination.
 * @param {Object} options - Query options.
 * @param {string} [options.search] - Search keyword for recipe name.
 * @param {number} [options.page] - Page number.
 * @param {number} [options.limit] - Items per page.
 * @returns {Promise<Object>} Paginated recipes result.
 */
async function findAll(options = {}) {
  const search = options.search || "";
  const page = Number(options.page) || 1;
  const limit = Number(options.limit) || 10;

  const from = (page - 1) * limit;
  const to = from + limit - 1;

  let query = supabase
    .from("recipes")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(from, to);

  if (search) {
    query = query.ilike("name", `%${search}%`);
  }

  const { data, error, count } = await query;

  if (error) {
    throw error;
  }

  return {
    data,
    meta: {
      total: count,
      page,
      limit,
      totalPages: Math.ceil(count / limit)
    }
  };
}

/**
 * Find one recipe by ID.
 * @param {string} id - Recipe UUID.
 * @returns {Promise<Object|null>} Recipe object or null.
 */
async function findById(id) {
  const { data, error } = await supabase
    .from("recipes")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      return null;
    }

    throw error;
  }

  return data;
}

/**
 * Create a new recipe.
 * @param {Object} data - Recipe data.
 * @param {string} data.name - Recipe name.
 * @param {string} data.ingredients - Recipe ingredients.
 * @returns {Promise<Object>} Created recipe.
 */
async function create(data) {
  const { data: recipe, error } = await supabase
    .from("recipes")
    .insert({
      name: data.name,
      ingredients: data.ingredients
    })
    .select("*")
    .single();

  if (error) {
    throw error;
  }

  return recipe;
}

/**
 * Update a recipe by ID.
 * @param {string} id - Recipe UUID.
 * @param {Object} data - Updated recipe data.
 * @returns {Promise<Object|null>} Updated recipe or null.
 */
async function update(id, data) {
  const { data: recipe, error } = await supabase
    .from("recipes")
    .update(data)
    .eq("id", id)
    .select("*")
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      return null;
    }

    throw error;
  }

  return recipe;
}

/**
 * Delete a recipe by ID.
 * @param {string} id - Recipe UUID.
 * @returns {Promise<Object|null>} Deleted recipe or null.
 */
async function remove(id) {
  const { data: recipe, error } = await supabase
    .from("recipes")
    .delete()
    .eq("id", id)
    .select("*")
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      return null;
    }

    throw error;
  }

  return recipe;
}

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove
};