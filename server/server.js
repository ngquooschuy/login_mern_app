import express from "express";
import cors from "cors";
import morgan from "morgan";
import connect from "./database/connection.js";
import router from "./router/route.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));
app.disable("x-powered-by");

const port = 8080;

app.get("/", (req, res) => {
  res.status(201).json("Home GET request");
});

app.use('/api/v1', router)

connect().then(() => {
  try {
    app.listen(port, () => {
      console.log(`Server listening on ${port}`);
    });
  } catch (error) {
    console.log("Can not connect to server");
  }
}).catch(error => {
    console.log("Invalid connection")
})
