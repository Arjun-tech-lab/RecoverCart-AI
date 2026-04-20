const express = require("express");
const cors = require("cors");

const eventRoutes = require("./routes/eventRoutes");
const analyzeRoutes = require("./routes/analyzeRoutes");

const app = express();

app.use(cors());
app.use(express.json());



app.use("/events", eventRoutes);
app.use("/analyze", analyzeRoutes);



app.listen(5000, () => {
  console.log("Server running on port 5000");
});