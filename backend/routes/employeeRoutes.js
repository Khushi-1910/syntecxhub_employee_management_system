const express = require("express");
const router = express.Router();
const Employee = require("../models/Employee");

// CREATE
router.post("/", async (req, res) => {
  const employee = new Employee(req.body);
  await employee.save();
  res.json(employee);
});

// READ
router.get("/", async (req, res) => {
  const employees = await Employee.find();
  res.json(employees);
});

// UPDATE
router.put("/:id", async (req, res) => {
  const updated = await Employee.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
});

// DELETE
router.delete("/:id", async (req, res) => {
  await Employee.findByIdAndDelete(req.params.id);
  res.json({ message: "Employee deleted" });
});

module.exports = router;
