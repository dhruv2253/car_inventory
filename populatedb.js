const mongoose = require("mongoose");
const Car = require("./models/car");

console.log(
  'This script populates some test cars to your database. Specified database as argument - e.g.: node populatedb "mongodb://localhost/sample_data"'
);

const userArgs = process.argv.slice(2);
const mongoDB = userArgs[0];


const carsData = [
  {
    make: "Toyota",
    model: "Camry",
    year: 2021,
    price: 25000,
    distance: 10000,
    condition: "New",
  },
  {
    make: "Honda",
    model: "Civic",
    year: 2020,
    price: 20000,
    distance: 5000,
    condition: "Used",
  },
  // Add more sample car data here
];

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB)
  console.log("Debug: Connected");
  await Car.deleteMany();
  await createCars();

  console.log("Sample data seeded successfully.");
  mongoose.connection.close();
}

async function createCars() {
  await Car.insertMany(carsData);
  console.log("Cars added successfully.");
}
