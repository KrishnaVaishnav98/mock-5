const express = require("express");
const { connection } = require("./db");
const { userRouter } = require("./Routes/userRouter");
const { empRouter } = require("./Routes/empRoutes");
const cors = require("cors")


const app = express();
app.use(cors())
app.use(express.json());

app.use("/user", userRouter)
app.use("/employee", empRouter)

app.get("/", (req, res) => {
    res.send("|| Welcome to Employees Management App ||")
})


app.listen(8080, async (req, res) => {
    try {
        await connection
        console.log("connected to server on port 8080")
    } catch (err) {
        consolelog(err)
    }
})