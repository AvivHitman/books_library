
import express from 'express';
import cors from "cors"
import bookRouter from './routes/book.route.js';
import authorRouter from './routes/author.route.js';
import * as dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

app.use('/books', bookRouter);
app.use('/authors', authorRouter);

app.listen((process.env.APP_PORT || 8080), () => {
  console.log(`Server running at http://localhost:${process.env.APP_PORT}`);
})