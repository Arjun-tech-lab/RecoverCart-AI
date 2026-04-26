const express = require("express");
const cors = require("cors");

const triggerRoutes = require("./routes/triggerRoutes");
const recoveryRoutes = require("./routes/recoveryRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/trigger", triggerRoutes);
app.use("/api/recovery", recoveryRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});