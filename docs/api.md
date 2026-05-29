# Recipes API Documentation

## Base URL

```text
http://localhost:5000
```

---

## Overview

The Recipes API is a backend service built with Node.js, Express, Supabase, Zod, and Pino.

It supports:

* Listing recipes
* Searching recipes by name
* Pagination
* Creating recipes
* Getting a recipe by ID
* Updating recipes
* Deleting recipes

---

## Standard Response Format

### Success Response

```json
{
  "success": true,
  "data": {}
}
```

### Error Response

```json
{
  "success": false,
  "message": "Error message",
  "errors": null
}
```

---

# Endpoints

---

## 1. Health Check

### GET `/`

Checks whether the API is running.

### Example Response

```json
{
  "success": true,
  "message": "Recipes API is running"
}
```

---

## 2. List Recipes

### GET `/recipes`

Returns a paginated list of recipes.

### Query Parameters

| Parameter | Type   | Required | Description                               |
| --------- | ------ | -------- | ----------------------------------------- |
| search    | string | No       | Search recipes by name                    |
| page      | number | No       | Page number. Default is 1                 |
| limit     | number | No       | Number of recipes per page. Default is 10 |

### Example Request

```http
GET /recipes?search=pizza&page=1&limit=10
```

### Example Response

```json
{
  "success": true,
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "name": "Pizza",
      "ingredients": "Cheese, dough, tomato sauce",
      "created_at": "2026-05-29T10:00:00.000Z"
    }
  ],
  "meta": {
    "total": 1,
    "page": 1,
    "limit": 10,
    "totalPages": 1
  }
}
```

---

## 3. Create Recipe

### POST `/recipes`

Creates a new recipe.

### Request Body

```json
{
  "name": "Pizza",
  "ingredients": "Cheese, dough, tomato sauce"
}
```

### Validation Rules

| Field       | Rule                           |
| ----------- | ------------------------------ |
| name        | Required, minimum 2 characters |
| ingredients | Required, minimum 3 characters |

### Example Response

```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "Pizza",
    "ingredients": "Cheese, dough, tomato sauce",
    "created_at": "2026-05-29T10:00:00.000Z"
  }
}
```

### Validation Error Example

```json
{
  "success": false,
  "message": "Validation error",
  "errors": {
    "fieldErrors": {
      "name": [
        "Name must be at least 2 characters"
      ],
      "ingredients": [
        "Ingredients must be at least 3 characters"
      ]
    }
  }
}
```

---

## 4. Get Recipe by ID

### GET `/recipes/:id`

Returns one recipe by UUID.

### Example Request

```http
GET /recipes/550e8400-e29b-41d4-a716-446655440000
```

### Example Response

```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "Pizza",
    "ingredients": "Cheese, dough, tomato sauce",
    "created_at": "2026-05-29T10:00:00.000Z"
  }
}
```

### Not Found Response

```json
{
  "success": false,
  "message": "Recipe not found",
  "errors": null
}
```

### Invalid ID Response

```json
{
  "success": false,
  "message": "Validation error",
  "errors": {
    "fieldErrors": {
      "id": [
        "Invalid recipe ID format"
      ]
    }
  }
}
```

---

## 5. Update Recipe

### PATCH `/recipes/:id`

Updates an existing recipe by UUID.

### Example Request

```http
PATCH /recipes/550e8400-e29b-41d4-a716-446655440000
```

### Request Body

```json
{
  "name": "Chicken Pizza"
}
```

You may update one or both fields:

```json
{
  "name": "Chicken Pizza",
  "ingredients": "Chicken, cheese, dough, tomato sauce"
}
```

### Example Response

```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "Chicken Pizza",
    "ingredients": "Cheese, dough, tomato sauce",
    "created_at": "2026-05-29T10:00:00.000Z"
  }
}
```

### Not Found Response

```json
{
  "success": false,
  "message": "Recipe not found",
  "errors": null
}
```

---

## 6. Delete Recipe

### DELETE `/recipes/:id`

Deletes an existing recipe by UUID.

### Example Request

```http
DELETE /recipes/550e8400-e29b-41d4-a716-446655440000
```

### Example Response

```json
{
  "success": true,
  "message": "Recipe deleted successfully",
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "Chicken Pizza",
    "ingredients": "Cheese, dough, tomato sauce",
    "created_at": "2026-05-29T10:00:00.000Z"
  }
}
```

### Not Found Response

```json
{
  "success": false,
  "message": "Recipe not found",
  "errors": null
}
```

---

# Status Codes

| Status Code | Meaning                       |
| ----------- | ----------------------------- |
| 200         | Request successful            |
| 201         | Resource created successfully |
| 400         | Validation error              |
| 404         | Resource or route not found   |
| 500         | Internal server error         |

---

# Notes

* Recipe IDs are UUIDs generated by Supabase.
* `/recipes/1` is not valid because the database does not use numeric IDs.
* All request bodies must be sent as JSON.
* Search is case-insensitive.
* Pagination is supported using `page` and `limit`.
