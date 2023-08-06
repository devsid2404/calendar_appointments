import 'reflect-metadata';
import * as dotenv from 'dotenv';
import AppServer from './AppServer';

// Setting up env config files
dotenv.config({path: `./envFiles/.${process.env.NODE_ENV || 'dev'}-env`});


new AppServer().start();

