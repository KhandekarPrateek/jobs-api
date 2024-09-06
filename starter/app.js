require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();
//connect db

const connectDb=require('./db/connect')
const authorization=require('./middleware/authentication')
//routes
const authHandler=require('./routes/auth')
const jobsHandler=require('./routes/jobs')

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(express.json());
// extra packages

// routes
app.use('/api/v1/auth',authHandler)
app.use('/api/v1/jobs',authorization,jobsHandler)

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDb(process.env.MONGO_URI)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
