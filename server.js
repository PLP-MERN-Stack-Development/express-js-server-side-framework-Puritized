// server.js
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import productRoutes from './routes/products.js';
import logger from './middleware/logger.js';
import errorHandler, { notFound } from './middleware/errorHandler.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/productsdb';

// Middleware
app.use(bodyParser.json());
app.use(logger);

//  API Routes
app.use('/api/products', productRoutes);

//  Root route
app.get('/', (req, res) => {
  res.send(' Hello World! Express.js API with MongoDB');
});

//  404 Middleware (should come after routes)
app.use(notFound);

//  Global Error Handling Middleware
app.use(errorHandler);

//  Connect to MongoDB and start the server
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log(' Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(` Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error(' MongoDB connection failed:', error.message);
    process.exit(1);
  });

export default app;