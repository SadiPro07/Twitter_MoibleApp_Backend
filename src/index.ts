import express from "express";
import userRoutes from "./Routes/userRouter";
import tweetRoutes from "./Routes/tweetRouter";
const app = express();
app.use(express.json());
app.use("/user", userRoutes)
app.use("/tweet", tweetRoutes)



app.get('/', (req, res) => {
    res.send('Hello World herer ther ririrri' );
})



app.listen(3000, () => {
    console.log('server is listening'); 
});

