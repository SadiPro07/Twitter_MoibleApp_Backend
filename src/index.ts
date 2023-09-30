import express from "express";
import cors from "cors";
import userRoutes from "./Routes/userRouter";
import tweetRoutes from "./Routes/tweetRouter";
import authRoutes from "./Routes/authRoutes";
import { authenticateToken } from './middleware/authMiddleware';
const app = express();
app.use(cors());
app.use(express.json());
app.use("/user", authenticateToken, userRoutes)
app.use("/tweet", authenticateToken,  tweetRoutes)
app.use("/auth", authRoutes);


app.get('/', (req, res) => {
    res.send('Hello World herer ther ririrri' );
})



app.listen(3000, () => {
    console.log('server is listening'); 
});

