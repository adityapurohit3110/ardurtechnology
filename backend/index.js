const express = require("express");
const app = express();
const DBConn = require("./config/DBConn");
const EmployeeRoutes = require("./routes/EmployeeRoutes"); // Import employee routes
const TimesheetRoutes = require('./routes/TimesheetRoutes');
// Import timesheet routes

require("dotenv").config();
const port = process.env.PORT || 5000;

const cors = require("cors");
app.use(cors());

// Use express.json() to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const authRouter = require("./routes/AuthRoutes");

let pool; // Initialize the database connection pool

(async () => {
  try {
    pool = await DBConn();

    app.use((req, res, next) => {
      req.pool = pool;
      next();
    });

    // Use the auth routes with the /auth prefix
    app.use("/auth", authRouter);

    // Use the employee routes with the /api prefix
    app.use("/api", EmployeeRoutes);
    app.use("/api", TimesheetRoutes);

    // Start the server on the specified port
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Error initializing server:", error);
  }
})();
