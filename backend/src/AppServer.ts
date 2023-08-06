import { Container, inject } from "inversify";
import * as bodyParser from 'body-parser';
import { Server } from 'http';
import { bind }from "./bind";
import { InversifyExpressServer } from "inversify-express-utils";
import Service_Identifier from "./Symbols";
import DatabaseConnection from "./db/dataBaseConnection";

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
        this.expressServer.setConfig(app => {
            app.use(bodyParser.json());
            app.use(bodyParser.urlencoded({extended: true}));
            app.disable('x-powered-by');
        });
    }

    private async startServer():Promise<void>{
        const app = this.expressServer.build();
        this.httpServer = await app.listen(process.env.PORT);
        console.log(`Application up at ${process.env.PORT}`);
    }

    public async start():Promise<void> {
        try {
            await bind(this.container);
            await this.addMiddleware();
            await this.container.get<DatabaseConnection>(Service_Identifier.DatabaseConnection).intConnection();
            // await this.databaseConnection?.intConnection();
            await this.startServer();
            await this.gracefulShutdownServer();
            console.log('Application bootstrap complete');
        } catch (err) {
            console.log('ERROR--->', err);
            console.log('Shuting down application');
            this.shutdownHttpServer();
        }
    }

    private async gracefulShutdownServer():Promise<void>{
        process.on('SIGTERM', () => {
            if (this.httpServer) {
                console.log('Shuting down http server');
                this.httpServer.close();
            }
        });

        process.on('SIGINT', () => {
            if (this.httpServer) {
                console.log('Shuting down http server');
                this.httpServer.close();
            }
        });
    }

    private shutdownHttpServer() {
        if (this.httpServer) {
            console.log('Shuting down http server');
            this.httpServer.close();
        }

    }


}