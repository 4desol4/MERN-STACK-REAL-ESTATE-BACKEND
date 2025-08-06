import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { userRoute } from "./routes/userRoute.js";
import { residencyRoute } from "./routes/residencyRoute.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(cookieParser());

//  CORS Configuration
const allowedOrigins = [
  "https://mern-stack-real-estate-frontend.vercel.app",
  "http://localhost:5173",
];

app.use(
  cors({
    origin: function (origin, callback) {
      console.log("CORS Request Origin:", origin);

      // If origin is undefined (like in Postman), allow it
      if (!origin) return callback(null, true);

      // Normalize origin (remove trailing slashes just in case)
      const cleanOrigin = origin.replace(/\/+$/, "");

      if (allowedOrigins.includes(cleanOrigin)) {
        callback(null, true);
      } else {
        console.error("CORS Blocked:", cleanOrigin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

//  Routes
app.use("/api/user", userRoute);
app.use("/api/residency", residencyRoute);

app.get("/api/test", (req, res) => {
  console.log("TEST ENDPOINT HIT!");
  res.json({ message: "Server is working!" });
});

//  Start server AFTER routes are defined
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
