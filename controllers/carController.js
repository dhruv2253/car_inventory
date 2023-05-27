const Car = require("../models/car");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
// Get car home page
exports.index = asyncHandler(async(req, res, next) => {
    // Get details of cars
    const numCars = await Car.countDocuments({});
    const usedCarCount = await Car.countDocuments({ condition: "Used" });
    const newCarCount = await Car.countDocuments({ condition: "New" });
    res.render("index", { 
        title: "Car Inventory", 
        cars: numCars,
        usedCars: usedCarCount,
        newCars: newCarCount
    });
});


// Display list of all cars.
exports.car_list = asyncHandler(async(req, res, next) => {
    const allCars = await Car.find({}, "year make model condition").sort({make: 1}).exec();
    res.render("car_list", { title: "Car List", car_list: allCars });
});

// Display detail page for a specific car.
exports.car_detail = asyncHandler(async(req, res, next) => {
    const car = await Car.findById(req.params.id);
    if (car === null) {
        const err = new Error("Car not found");
        err.status = 404;
        return next(err);
    }
    res.render("car_detail", { title: "Car Detail", car: car });
});

// Display car create form on GET.
exports.car_create_get = asyncHandler(async(req, res, next) => {
    res.render("car_form", {
        title: "Create Car"
    });
});

// Handle car create on POST.
exports.car_create_post = [
    body("make", "Make must not be empty.").trim().isLength({ min: 1 }).escape(),
    body("model", "Model must not be empty.").trim().isLength({ min: 1 }).escape(),
    body("year", "Year must not be empty.").trim().isLength({ min: 1 }).escape(),
    body("price", "Price must not be empty.").trim().isLength({ min: 1 }).escape(),
    body("distance", "Mileage must not be empty.").trim().isLength({ min: 1 }).escape(),
    body("condition", "Condition must not be empty.").trim().isLength({ min: 1 }).escape(),

    asyncHandler(async(req, res, next) => {
    const errors = validationResult(req);
    const conditionsArr = ["New", "Used"];
    const car = new Car({
        make: req.body.make,
        model: req.body.model,
        year: req.body.year,
        price: req.body.price,
        distance: req.body.distance,
        condition: req.body.condition
    })
    if (!errors.isEmpty()) {
        res.render("car_form", {
            title: "Create Car",
            car: car,
            errors: errors.array(),
            conditions: conditionsArr
        });
        return;
    } else {
        await car.save();
        res.redirect(car.url);
    }
}),
]
// Display car delete form on GET.
exports.car_delete_get = asyncHandler(async(req, res, next) => {
    const car = await Car.findById(req.params.id);
    if (car === null) {
        res.redirect("/catalog/cars");
    }
        
    res.render("car_delete", { title: "Delete Car", car: car});
});

// Handle car delete on POST.
exports.car_delete_post = asyncHandler(async(req, res, next) => {
    try {
        await Car.findByIdAndRemove(req.params.id);
        console.log("Deleting car:", req.params.id); // Add this line
        res.redirect("/catalog/cars");
      } catch (err) {
        return next(err);
      }

});

// Display car update form on GET.
exports.car_update_get = asyncHandler(async(req, res, next) => {
    res.send("NOT IMPLEMENTED: Car update GET");
});

// Handle car update on POST.
exports.car_update_post = asyncHandler(async(req, res, next) => {
    res.send("NOT IMPLEMENTED: Car update POST");
});


