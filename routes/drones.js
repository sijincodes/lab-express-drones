const express = require("express");
const DroneModel = require("../models/Drone.model");
const router = express.Router();

// require the Drone model here
const Drone = require("../models/Drone.model");

router.get("/drones", (req, res, next) => {
  // Iteration #2: List the drones
  Drone.find()
    .then((dronefromDB) => res.render("drones/list", { drone: dronefromDB }))
    .catch((error) => next(error));
});

router.get("/drones/create", (req, res) => {
  // Iteration #3: Add a new drone
  res.render("drones/create-form");
});

router.post("/drones/create", (req, res) => {
  // Iteration #3: Add a new drone
  const { name, propellers, maxSpeed } = req.body;
  Drone.create({ name, propellers, maxSpeed })
    .then((dronesfromDB) => res.redirect("/drones"))
    .catch((error) => res.render("drones/create-form"));
});

router.get("/drones/:id/edit", (req, res, next) => {
  // Iteration #4: Update the drone
  const { id } = req.params;
  Drone.findById(id)
    .then((dronefromDB) =>
      res.render("drones/update-form", { drone: dronefromDB })
    )
    .catch((error) => next(error));
});

router.post("/drones/:id/edit", (req, res, next) => {
  // Iteration #4: Update the drone
  const { id } = req.params;
  const { name, propellers, maxSpeed } = req.body;
  Drone.findByIdAndUpdate(id, { name, propellers, maxSpeed }, { new: true })
    .then(() => res.redirect("/drones"))
    .catch((error) => next(error));
});

router.post("/drones/:id/delete", (req, res, next) => {
  // Iteration #5: Delete the drone
  const {id}=req.params;
  Drone.findByIdAndDelete(id)
  .then(()=>res.redirect('/drones'))
  .catch((error) => {
     next(error);
  });
  
});

module.exports = router;
