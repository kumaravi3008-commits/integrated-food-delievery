const router = require("express").Router();
const {
  createRestaurant,
  getAllRestaurants,
  getSingleRestaurant,
  editRestaurant,
  deleteRestaurant,
} = require("../controllers/restaurantController");
const authenticateUser = require("../middleware/authenticateUser");

// Public - user side
router.get("/", getAllRestaurants);
router.get("/:id", getSingleRestaurant);

// Admin only
router.post("/", authenticateUser, createRestaurant);
router.put("/:id", authenticateUser, editRestaurant);
router.delete("/:id", authenticateUser, deleteRestaurant);

module.exports = router;