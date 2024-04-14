const express = require("express");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const cors = require("cors");
const dotenv = require("dotenv");

const apiRoutes = require("#routes"); // Make sure your setup supports path aliases.

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// set request limit for each IP ( 100 requests per windowMs )
const limiter = rateLimit({
  max: 100,
  windowMs: 15 * 60 * 1000, // 15 minutes
});

// middlewares
app.use(limiter);
app.use(helmet());
app.use(cors());
app.use(express.json());

//routes
app.use("/api", apiRoutes);

// import { dropAllTables } from "#database";
// dropAllTables();

app.listen(PORT, () => console.log(`Server running on port ${PORT}!`));
