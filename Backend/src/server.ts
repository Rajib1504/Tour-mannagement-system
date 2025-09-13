/* eslint-disable no-console */
import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';
import { envVars } from './app/modules/config/env';

let server: Server;



const startServer = async () => {
      try {
            await mongoose.connect(envVars.DB_URL)
            console.log('connected to DB');

            server = app.listen(envVars.PORT, () => {
                  console.log(`Server is running on port ${envVars.PORT} `);
            })
      } catch (error) {
            console.log(error);
      }
}
startServer()



process.on('unhandledRejection', (err) => {
      console.log('unhandledRejection detected ... server is shutting down..', err);
      if (server) {
            server.close(() => {
                  process.exit(1)

            })
      }
      process.exit(1);
})

process.on('uncaughtException', (err) => {
      console.log('uncaught Exception detected ... server is shutting down..', err);
      if (server) {
            server.close(() => {
                  process.exit(1)
            })
      }
      process.exit(1);
})
process.on('SIGTERM', () => {
      console.log('sigterm signal recived ... server is shutting down..');
      if (server) {
            server.close(() => {// server.close mean off the database 
                  process.exit(1)// we are exit from our express

            })
      }
      process.exit(1);// if data base is off and found this error then also of the backend
})


/**
 * few error which can cause our database shutdown forcefully :
 * unhandled rejection error
 * uncaught rejection error
 * signal termination sigterm : this is some signal when server like AWS what to shut down your server they are sending some signal then shut down the sever
*/
  
// unhandled rejection:
// Promise.reject(new Error('i forget to solve this ')) exemple when we can get this unhandled rejection.

// uncaughtException error: 
// throw new Erro r('i forgor to handle this local error')
// this is an our local error when we didn't control something inside try catch or anything locally which is not caught by try catch 