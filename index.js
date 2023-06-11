const express=require("express");
const { connection } = require("./db");
const { userRouter } = require("./routes/user.routes");
require("dotenv").config();
const cors=require('cors');
const { noteRouter } = require("./routes/note.routes");

const port=process.env.PORT
const app=express();
const corsOptions ={
    origin:'https://todo-mern-app.vercel.app', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions))
app.use(express.json());
app.use("/user", userRouter);
app.use("/note", noteRouter);

app.get("/", (req, res)=>{
    res.send({
        message: "api is working now"
    })
})

app.listen(port, async()=>{
    try {
        await connection
        console.log('Database is connected');
    } catch (error) {
        console.log(error);
    }
    console.log(`Server is running on port ${port}`);
})

