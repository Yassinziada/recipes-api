# Recipes API

A production-style backend API for managing recipes, built with Node.js, Express, Supabase, Zod, and Pino.

This project follows a clean layered architecture:

```text
Routes → Controller → Service → Repository → Supabase
```

---

## Features

* Express.js backend
* Supabase PostgreSQL database
* Full CRUD for recipes
* Search by recipe name
* Pagination
* Zod request validation
* UUID validation
* Global error handling
* Custom API error class
* Async handler middleware
* Pino request logging
* Environment-based configuration
* API documentation

---

## Tech Stack

| Area               | Technology          |
| ------------------ | ------------------- |
| Runtime            | Node.js 20+         |
| Framework          | Express.js          |
| Database           | Supabase PostgreSQL |
| Validation         | Zod                 |
| Logging            | Pino / pino-http    |
| Environment Config | dotenv              |

---

## Project Structure

```text
recipes-api/
├── docs/
│   └── api.md
├── src/
│   ├── config/
│   │   ├── env.js
│   │   ├── logger.js
│   │   └── supabase.js
│   ├── middleware/
│   │   ├── errorHandler.js
│   │   ├── notFound.js
│   │   ├── requestLogger.js
│   │   └── validate.js
│   ├── modules/
│   │   └── recipes/
│   │       ├── recipe.controller.js
│   │       ├── recipe.repository.js
│   │       ├── recipe.routes.js
│   │       ├── recipe.service.js
│   │       └── recipe.validation.js
│   ├── utils/
│   │   ├── ApiError.js
│   │   └── asyncHandler.js
│   ├── app.js
│   └── server.js
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

---

## Architecture

```text
Client
  ↓
Express App
  ↓
Routes
  ↓
Controller
  ↓
Service
  ↓
Repository
  ↓
Supabase PostgreSQL
```

### Layer Responsibilities

| Layer      | Responsibility                                |
| ---------- | --------------------------------------------- |
| Routes     | Connect HTTP routes to controller functions   |
| Controller | Handle request and response                   |
| Service    | Business logic                                |
| Repository | Database access                               |
| Validation | Validate request body, params, and query data |
| Middleware | Error handling, validation, logging           |

---

## Database Table

Table name:

```text
recipes
```

SQL:

```sql
create table recipes (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  ingredients text not null,
  created_at timestamptz default now()
);
```

For local testing, Row Level Security can be disabled:

```sql
alter table recipes disable row level security;
```

---

## Environment Variables

Create a `.env` file in the root folder:

```env
PORT=5000
NODE_ENV=development
LOG_LEVEL=info

SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_or_publishable_key
```

Use `.env.example` as a reference.

Important: do not commit `.env` to GitHub.

---

## Installation

Install dependencies:

```bash
npm install
```

---

## Run the Project

Development mode:

```bash
npm run dev
```

Production mode:

```bash
npm start
```

The API will run on:

```text
http://localhost:5000
```

---

## API Endpoints

| Method | Endpoint       | Description                             |
| ------ | -------------- | --------------------------------------- |
| GET    | `/`            | Health check                            |
| GET    | `/recipes`     | List recipes with search and pagination |
| POST   | `/recipes`     | Create a recipe                         |
| GET    | `/recipes/:id` | Get a recipe by UUID                    |
| PATCH  | `/recipes/:id` | Update a recipe by UUID                 |
| DELETE | `/recipes/:id` | Delete a recipe by UUID                 |

Full API documentation is available in:

```text
docs/api.md
```

---

## Example Requests

### Create a Recipe

```bash
curl -X POST http://localhost:5000/recipes \
  -H "Content-Type: application/json" \
  -d '{"name":"Pizza","ingredients":"Cheese, dough, tomato sauce"}'
```

Example response:

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

---

### List Recipes

```http
GET /recipes?page=1&limit=10
```

Example response:

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

### Search Recipes

```http
GET /recipes?search=pizza
```

---

### Get Recipe by ID

```http
GET /recipes/550e8400-e29b-41d4-a716-446655440000
```

---

### Update Recipe

```bash
curl -X PATCH http://localhost:5000/recipes/550e8400-e29b-41d4-a716-446655440000 \
  -H "Content-Type: application/json" \
  -d '{"name":"Chicken Pizza"}'
```

---

### Delete Recipe

```bash
curl -X DELETE http://localhost:5000/recipes/550e8400-e29b-41d4-a716-446655440000
```

---

## Response Format

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
  "message": "Recipe not found",
  "errors": null
}
```

---

## Validation Rules

### Create Recipe

| Field       | Rule                           |
| ----------- | ------------------------------ |
| name        | Required, minimum 2 characters |
| ingredients | Required, minimum 3 characters |

### Update Recipe

| Field       | Rule                           |
| ----------- | ------------------------------ |
| name        | Optional, minimum 2 characters |
| ingredients | Optional, minimum 3 characters |

### ID Validation

Recipe IDs must be valid UUIDs.

Example invalid ID response:

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

## Status Codes

| Status Code | Meaning                       |
| ----------- | ----------------------------- |
| 200         | Request successful            |
| 201         | Resource created successfully |
| 400         | Validation error              |
| 404         | Resource or route not found   |
| 500         | Internal server error         |

---

## Available Scripts

| Script        | Description                 |
| ------------- | --------------------------- |
| `npm run dev` | Run the server with nodemon |
| `npm start`   | Run the server normally     |

---

## Git Commit Examples

Recommended conventional commit messages:

```text
feat: initialize express server
feat: add recipe CRUD routes
feat: implement validation middleware
feat: add global error handling
feat: integrate supabase repository
docs: add API documentation
docs: add README
```

---

## Notes

* Recipe IDs are UUIDs generated by Supabase.
* `/recipes/1` is invalid because numeric IDs are not used.
* Search is case-insensitive.
* Pagination supports `page` and `limit`.
* `.env` must not be committed to GitHub.
* `.env.example` should be committed to GitHub as a reference.
