const express = require("express");
const cookiesParser = require("cookie-parser");
const cors = require("cors");


/*using middleware */
const app = express();
app.use(express.json());
app.use(cookiesParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}))

/* routes */
const AuthRouter = require("./routes/auth.routes");
const AlertRouter = require("./routes/alert.routes");

/* using routes */
app.use('/api/auth',AuthRouter);
app.use('/api/alert',AlertRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

module.exports = app;
