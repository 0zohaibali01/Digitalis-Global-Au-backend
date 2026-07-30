import express from 'express';
import cors from 'cors';
import contactRoutes from './routes/contactRoutes.js';
import caseStudyRoutes from './routes/caseStudyRoutes.js';

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
      // Allow requests with no origin (mobile apps, curl, server-to-server)
      if (!origin) return callback(null, true);

      // Check fixed origins OR any Vercel deployment URL (.vercel.app)
      const isAllowed =
        allowedOrigins.includes(origin) || origin.endsWith('.vercel.app');

      if (isAllowed) {
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
app.use('/api/v1/case-studies', caseStudyRoutes);

export default app;

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}