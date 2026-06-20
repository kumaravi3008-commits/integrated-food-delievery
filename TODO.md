# food-del backend - pending work

This TODO covers ONLY backend work that is missing/incomplete. Existing working code (health check + app wiring) is locked.

## 1) API Contracts implemented via code scaffolding (missing modules)
### Restaurant module
- [ ] Add Mongoose model: `backend/src/models/Restaurant.js`
- [ ] Add service: `backend/src/services/restaurantsService.js`
- [ ] Add controller: `backend/src/controllers/restaurantsController.js`
- [ ] Add routes: `backend/src/routes/restaurants.js`
- [ ] Add validation helpers (if needed) or inline request validation in controller/service
- [ ] Wire routes into `backend/src/app.js` with additive-only statements

### Menu module
- [ ] Add Mongoose model: `backend/src/models/Menu.js`
- [ ] Add service: `backend/src/services/menusService.js`
- [ ] Add controller: `backend/src/controllers/menusController.js`
- [ ] Add routes: `backend/src/routes/menus.js`
- [ ] Add validation helpers (if needed)
- [ ] Wire routes into `backend/src/app.js` with additive-only statements

### Order module (full lifecycle)
- [ ] Add Mongoose model: `backend/src/models/Order.js`
- [ ] Add service: `backend/src/services/ordersService.js`
- [ ] Add controller: `backend/src/controllers/ordersController.js`
- [ ] Add routes: `backend/src/routes/orders.js`
- [ ] Implement status state machine and timestamps for lifecycle:
  - [ ] PLACED → ACCEPTED
  - [ ] ACCEPTED → PREPARING
  - [ ] PREPARING → COURIER_ASSIGNED
  - [ ] COURIER_ASSIGNED → PICKED_UP
  - [ ] PICKED_UP → DELIVERED
  - [ ] CANCELLED allowed from PLACED/ACCEPTED/PREPARING
- [ ] Enforce invalid transition errors with 409
- [ ] Wire routes into `backend/src/app.js` with additive-only statements

## 2) Shared validation + error consistency
- [ ] Add validation utility file (optional) under `backend/src/utils/` if needed
- [ ] Keep existing 404 + 500 behavior; only add minimal additive error handling if required

## 3) Postman collection + environment
- [ ] Create Postman environment: `backend/postman/environments/food-del-dev.postman_environment.json`
- [ ] Create Postman collection: `backend/postman/food-del.postman_collection.json`
- [ ] Include folders:
  - [ ] 00 Health
  - [ ] 01 Restaurants
  - [ ] 02 Menus
  - [ ] 03 Orders (Lifecycle)
- [ ] Include testing sequence (create restaurant → create menu → create order → advance lifecycle)

## 4) Smoke testing (after code generation)
- [ ] Start backend (npm run dev)
- [ ] Verify GET /api/health still works
- [ ] Verify new routes respond with contract-shaped schemas

