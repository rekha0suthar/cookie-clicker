import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import clickRoutes from './routes/clickRoutes.js';

dotenv.config(); // env file access

// app setup
const app = express();

// middleware
app.use(express.json()); // parse json
app.use(cors()); // enable cors

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

// Routes initialisation
app.use('/api', clickRoutes);

// Port defined
const PORT = process.env.PORT || 5000;

// Server listening
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
