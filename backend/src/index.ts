import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import taskRoutes from './routes/tasks';
import mongoose from 'mongoose';
import { Request, Response } from 'express';

dotenv.config();


mongoose
  .connect(process.env.MONGO_URI!)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));


const app = express();

app.use(cors());
app.use(express.json());


app.get('/',  (_req: Request, res: Response) => {
    res.send('API is running!')
});
app.use('/api/tasks', taskRoutes);


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));