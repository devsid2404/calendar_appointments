import admin from 'firebase-admin';
import { injectable } from 'inversify';
import { logger } from '../commons/logger/logger';

@injectable()
export default class DatabaseConnection {
    private db;

    constructor() {
        
    }

    public async intConnection() {
        const credentials = require(`../../envFiles/${process.env.ENV}_db.json`);
        admin.initializeApp({
            credential: admin.credential.cert(credentials)
        });
        this.db = admin.firestore();
        logger.info('Db connected Successfully');
    }

    public getConnection = () => this.db;
}