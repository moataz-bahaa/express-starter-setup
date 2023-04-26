import 'dotenv/config';
import 'express-async-errors';
import express from 'express';
import cors from 'cors';
import path from 'path';

const app = express();

// middlewares
app.use(cors({ origin: '*' }));
app.use(express.static(path.resolve('public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes

// error handler

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`server is running on port: ${port}`);
});
