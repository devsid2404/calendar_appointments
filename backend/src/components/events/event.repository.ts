


import { inject, injectable } from "inversify";
import Symbols from "../../Symbols";
import DatabaseConnection from "../../db/dataBaseConnection";
import moment from "moment";
import { IEvent } from "./event.interface";



@injectable()
export default class EventRepository {

    @inject(Symbols.DatabaseConnection)
    private dbConnection: DatabaseConnection;

    public async create(parameters) {
        await this.dbConnection.getConnection().collection("event").add({
            createdAt: moment().utc(),
            ...parameters
        });
    }
    

    public async getAll() {
        const users = await this.dbConnection.getConnection().collection("event").get();
        const responseArray: any = [];
        users.forEach(userDoc => {
            responseArray.push(userDoc.data());
        });
        return responseArray;
    }

    public async getByUserId(userId: string):Promise<IEvent[]> {
        const event = await this.dbConnection.getConnection().collection("event")
        .where('userId', '==', userId);
        const responseArray: IEvent[] = [];
        await event.get().then((snapshot) => {
            snapshot.forEach(doc => {
                responseArray.push(doc.data());
            });
        });
        return responseArray;
    }
}