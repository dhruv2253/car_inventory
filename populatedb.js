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
  {
    make: "Honda",
    model: "Accord",
    year: 2022,
    price: 27000,
    distance: 8000,
    condition: "New",
  },
  {
    make: "Ford",
    model: "Mustang",
    year: 2020,
    price: 40000,
    distance: 5000,
    condition: "Used",
  },
 
  {
    make: "Chevrolet",
    model: "Camaro",
    year: 2021,
    price: 35000,
    distance: 12000,
    condition: "Used",
  },
  {
    make: "Nissan",
    model: "Altima",
    year: 2019,
    price: 20000,
    distance: 15000,
    condition: "Used",
  },
  {
    make: "BMW",
    model: "X5",
    year: 2021,
    price: 60000,
    distance: 10000,
    condition: "New",
  },
  {
    make: "Audi",
    model: "A4",
    year: 2020,
    price: 35000,
    distance: 8000,
    condition: "Used",
  },
  {
    make: "Mercedes-Benz",
    model: "C-Class",
    year: 2021,
    price: 50000,
    distance: 6000,
    condition: "New",
  },
  {
    make: "Hyundai",
    model: "Elantra",
    year: 2018,
    price: 15000,
    distance: 20000,
    condition: "Used",
  },
  {
    make: "Kia",
    model: "Sorento",
    year: 2021,
    price: 30000,
    distance: 12000,
    condition: "New",
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
