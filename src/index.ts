import express from 'express';
import cors from 'cors';
import contactRoutes from './routes/contactRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://digitalis-global-au.vercel.app',
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Digitalis Backend API is running 🚀');
});

app.use('/api/v1/contact', contactRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});