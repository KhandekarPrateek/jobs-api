require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();

//security packages
const xss=require('xss-clean')
const helmet=require('helmet')
const cors=require('cors')
const ratelimiter=require('express-rate-limit')

//connect db

const connectDb=require('./db/connect')
const authorization=require('./middleware/authentication')
//routes
const authHandler=require('./routes/auth')
const jobsHandler=require('./routes/jobs')

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
app.set('trust proxy',1)//for deployemnet 
app.use(ratelimiter({
  windowMs:15*60*1000,//15 minutes
  max:100,//limit each ip address to 100 requests only 
}))
app.use(express.json());
//security
app.use(helmet())
app.use(cors())
app.use(xss())

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
