// AuthRoutes.js
const express = require("express");
const router = express.Router();

// Importing controller functions
const { SignUpController, LoginController, EmployeeDetailsController } = require("../controllers/AuthControllers");
const { TimesheetController } = require("../controllers/TimesheetController"); // Import TimesheetController correctly

// Sign up route - handles user registration
router.post("/signup", SignUpController);

// Login route - handles user login
router.post("/login", LoginController);

// Employee details route - handles employee details submission
router.post("/employee-details", EmployeeDetailsController);

// Timesheet route - handles timesheet submission
router.post("/api/timesheet", TimesheetController);

// Exporting the routes
module.exports = router;
