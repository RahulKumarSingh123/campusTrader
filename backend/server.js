require('dotenv').config();
const express = require('express');
const cors = require('cors');
const dbConnection = require('./utils/db.js');
const userRouter = require('./routes/userRoutes.js');
const listingRouter = require('./routes/listingRoutes.js');
const app = express();
const path = require('path');

dbConnection();

app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.json());
app.use('/user', userRouter);
app.use('/listing', listingRouter);

app.listen(process.env.PORT, '0.0.0.0', () => {
  console.log(`Server started at Port:${process.env.PORT}`);
});
