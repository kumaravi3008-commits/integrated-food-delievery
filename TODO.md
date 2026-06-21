# TODO.md

- [x] Inspect Restaurant routes/controllers/services/models for existing search/filter support
- [x] Implement Restaurant schema fields: `cuisine` (String) and `rating` (Number)
- [x] Implement GET /api/restaurants query params:
  - [x] `search` (case-insensitive on `name`)
  - [x] `cuisine` (case-insensitive exact match)
  - [x] `rating` (numeric validation; filter by `rating >= value`)
  - [x] Combine filters using AND logic via a single Mongo query
- [x] Validate rating input (must be non-negative number)
- [x] Update Postman collection with new example requests (optional)
- [x] Provide final report with files changed, testing instructions, and commit message


