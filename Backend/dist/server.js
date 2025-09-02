"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
let server;
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/tour-db');
        console.log('connected to DB');
        server = app_1.default.listen(3000, () => {
            console.log('server is running on port 3000 ');
        });
    }
    catch (error) {
        console.log(error);
    }
});
startServer();
process.on('unhandledRejection', (err) => {
    console.log('unhandledRejection detected ... server is shutting down..', err);
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }
    process.exit(1);
});
process.on('uncaughtException', (err) => {
    console.log('uncaught Exception detected ... server is shutting down..', err);
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }
    process.exit(1);
});
process.on('SIGTERM', () => {
    console.log('sigterm signal recived ... server is shutting down..');
    if (server) {
        server.close(() => {
            process.exit(1); // we are exit from our express
        });
    }
    process.exit(1); // if data base is off and found this error then also of the backend
});
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
