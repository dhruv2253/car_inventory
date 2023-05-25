const express = require("express");
const router = express.Router();

// Require controller modules.
const carController = require("../controllers/carController");

// Get car home page
router.get("/", carController.index);

// GET request for creating a car
router.get("/car/create", carController.car_create_get);

// POST request for creating a car
router.post("/car/create", carController.car_create_post);

// GET request to delete a car
router.get("/car/:id/delete", carController.car_delete_get);

// POST request to delete a car
router.post("/car/:id/delete", carController.car_delete_post);

// GET request to update a car
router.get("/car/:id/update", carController.car_update_get);

// POST request to update a car
router.post("/car/:id/update", carController.car_update_post);

// GET request for one car
router.get("/car/:id", carController.car_detail);

// GET request for list of all cars
router.get("/cars", carController.car_list);

module.exports = router;