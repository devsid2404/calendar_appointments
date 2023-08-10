import { inject, injectable } from "inversify";
import Symbols from "../../Symbols";
import DatabaseConnection from "../../db/dataBaseConnection";
import moment from "moment";
import { IUser } from "./user.interface";



@injectable()
export default class UserRepository {

    @inject(Symbols.DatabaseConnection)
    private dbConnection: DatabaseConnection;

    public async create(parameters) {
       await this.dbConnection.getConnection().collection("users").add({
            createdAt: moment().utc(),
            ...parameters
        });
    }
    

    public async getAll():Promise<IUser[]> {
        const users = await this.dbConnection.getConnection().collection("users").get();
        const responseArray: IUser[] = [];
        users.forEach(userDoc => {
            responseArray.push({
                id: userDoc.id,
                ...userDoc.data(),
                createdAt: moment(userDoc.data().createdAt).utc().toString()});
        });
        return responseArray;
    }

    public async getOneById(documentId) {
        const user = await this.dbConnection.getConnection().collection("users").doc(documentId);
        const response = await user.get();
        return response.data();
    }

    public async getByEmailId(emailId) {
        const user = await this.dbConnection.getConnection().collection("users")
            .where('email', '==', emailId);
        const responseArray: any = [];
        await user.get().then((snapshot) => {
            snapshot.docs.forEach(doc => {
                responseArray.push(doc);
            });
        });
        return responseArray;
    }

}