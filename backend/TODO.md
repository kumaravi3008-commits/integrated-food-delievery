# TODO - Day 2 Apply Auth to Full Project

- [x] Add JWT protection to all cart routes; bind cart operations to `req.user.userId`
- [x] Add JWT protection to all order routes; bind consumer identity to `req.user.userId` (no client-provided customerId)
- [x] Restrict order status transition PATCH routes to `courier` role via RBAC
- [x] Filter order listing/get-by-id to only the authenticated consumer’s orders
- [x] Add JWT protection to checkout route; bind checkout customerId to `req.user.userId`
- [x] Restrict restaurant create/update/delete routes to `restaurant_owner` role
- [x] Ensure public restaurant listing endpoints remain unchanged
- [x] Smoke test API flows with Postman collection/environment



