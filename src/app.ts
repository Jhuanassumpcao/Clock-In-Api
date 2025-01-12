import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes';
import timeEntryRoutes from './routes/time-entry.routes';

const app = express();

app.use(express.json());
app.use(cors());
app.use('/', (req, res, next) => {
  console.log('Hello World!');
  next();
});
app.use('/auth', authRoutes);
app.use('/time-entries', timeEntryRoutes);

export default app;
