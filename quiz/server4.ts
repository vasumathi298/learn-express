import express from 'express';
import cors from 'cors';
import readUsersRouter from './readUsers';
import writeUsersRouter from './writeUsers';

const app = express();
const port = 8000;

// Middleware
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/read', readUsersRouter);
app.use('/write', writeUsersRouter);

// Start server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});