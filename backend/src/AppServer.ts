import { Container} from "inversify";
import * as express from 'express';
import * as bodyParser from 'body-parser';
import { Server } from 'http';
import { bind }from "./bind";
import { InversifyExpressServer } from "inversify-express-utils";
import Service_Identifier from "./Symbols";
import DatabaseConnection from "./db/dataBaseConnection";
import { API_ERROR_STATUS_CODE } from "./commons/errors/errorMapping";
import { logger } from "./commons/logger/logger";

export default class AppServer {
    private container: Container;
    private expressServer: InversifyExpressServer;
    private httpServer?: Server; 

    constructor() {
        this.container = new Container({defaultScope: 'Singleton'});
        this.expressServer =  new InversifyExpressServer(this.container, null, {
            rootPath: '/api'
        });
        
    }

    private async addMiddleware():Promise<void> { 
        this.expressServer.setConfig((app: express.Application) => {
            app.use(bodyParser.json());
            app.use(bodyParser.urlencoded({extended: true}));
            app.use((req, res, next) => {
                logger.info(req.url);
                next();
            });
            app.disable('x-powered-by');
        });
        this.setApiErrorConfig();
    }

    private async setApiErrorConfig(): Promise<void> {
        this.expressServer.setErrorConfig(app => {
            app.use((err, req, res, next) => {
                logger.error(err, 'API ERROR');
                const statusCode = API_ERROR_STATUS_CODE[err.name] || 500;
                res.status(statusCode).json({
                    success: false,
                    data: {
                        message: err.message
                    }
                });
            });
        })
    }

    private async startServer():Promise<void>{
        const app = this.expressServer.build();
        this.httpServer = await app.listen(process.env.PORT);
        logger.info(`Application up at ${process.env.PORT}`);
    }

    public async start():Promise<void> {
        try {
            await bind(this.container);
            await this.addMiddleware();
            await this.container.get<DatabaseConnection>(Service_Identifier.DatabaseConnection).intConnection();
            await this.startServer();
            await this.gracefulShutdownServer();
            logger.info('Application bootstrap complete');
        } catch (err) {
            logger.error(err);
            logger.error('Shuting down application');
            this.shutdownHttpServer();
        }
    }

    private async gracefulShutdownServer():Promise<void>{
        process.on('SIGTERM', () => {
            if (this.httpServer) {
                logger.error('Shuting down http server');
                this.httpServer.close();
            }
        });

        process.on('SIGINT', () => {
            if (this.httpServer) {
                logger.error('Shuting down http server');
                this.httpServer.close();
            }
        });
    }

    private shutdownHttpServer() {
        if (this.httpServer) {
            logger.error('Shuting down http server');
            this.httpServer.close();
        }
    }


}