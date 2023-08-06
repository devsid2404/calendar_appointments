import admin from 'firebase-admin';
import { injectable } from 'inversify';

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
        console.log('Db connected Successfully');    
    }

    public getConnection = () => this.db;
}