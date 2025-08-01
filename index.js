import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { userRoute } from './routes/userRoute.js';
import { residencyRoute } from './routes/residencyRoute.js';
dotenv.config()

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(cookieParser());

// ✅ CORS Configuration
const allowedOrigins = [
  "https://mern-stack-real-estate-frontend.vercel.app" 
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));

// ✅ Routes
app.use('/api/user', userRoute);
app.use("/api/residency", residencyRoute);

app.get('/api/test', (req, res) => {
    console.log('TEST ENDPOINT HIT!');
    res.json({ message: 'Server is working!' });
});

// ✅ Start server AFTER routes are defined
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
