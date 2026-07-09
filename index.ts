import express, { Application,Request, Response} from "express"
import dotenv from 'dotenv'
import cors from "cors"
import connectDB from "./config/DB"
import DepartmentRoutes from "./Routes/DepartmentRoutes"
import Authroutes from "./Routes/AuthRoutes"
import BookingRoutes from "./Routes/BookingRoutes"
import DoctorsRoutes from "./Routes/DoctorsRoutes"
import ActivityRoutes from "./Routes/ActivityRoutes"
import SupportRoutes from "./Routes/SupportRoutes"
dotenv.config()
const app : Application = express()


app.use(express.json())
const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:5174",
    "https://medi-bridge-client.vercel.app"
]

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.get("/", (req : Request , res : Response)=>{  
    res.status(200).json({ success : true, message : "MediBridge Server running..."})
})
app.use("/api/auth", Authroutes)
app.use("/api", BookingRoutes)
app.use("/api", DoctorsRoutes)
app.use("/api", ActivityRoutes)
app.use("/api", SupportRoutes)
app.use("/api", DepartmentRoutes)

const startServer = async () => {
    try {
        connectDB()
    
        console.log("starting server");
        const PORT : string | undefined = process.env.PORT
        app.listen(PORT, ()=>{
            console.log(`MediBridge Server is running at http://localhost:${PORT}`);
            
        })
    } catch (error) {
        console.error("Startup error",error);
    }
}
process.on("uncaughtException", (err : any) => {
  console.error("Uncaught Exception:", err.stack || err);
});
process.on("unhandledRejection", (err : any) => {
  console.error("Unhandled Rejection:", err.stack || err);
});
startServer()

app.use((req : Request, res : Response) => {
  res.status(404).json({ success: false, message: "ROUTE NOT FOUND" });
});
