import express, { Request, Response } from 'express';
import cors from "cors";
import { router } from './app/router/router';
import { globalErrorHandler } from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
const app = express();
app.use(express.json())
app.use(cors())

app.use('/api/v1', router)
app.get('/', (req: Request, res: Response) => {
      res.status(200).json({
            message: "wellcome to tour mannagement system"
      })
})

app.use(globalErrorHandler)
// not found route will be after our global error handlers 
app.use(notFound);


export default app;


//route matchin -> controler -> service -> model -> DB
//work flow -> 1st model 2nd service 3rd controler 4th router 