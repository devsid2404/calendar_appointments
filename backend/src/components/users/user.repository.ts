import { inject, injectable } from "inversify";
import Symbols from "../../Symbols";
import DatabaseConnection from "../../db/dataBaseConnection";
import moment from "moment";



@injectable()
export default class UserRepository {

    @inject(Symbols.DatabaseConnection)
    private dbConnection: DatabaseConnection;

    public async create(parameters) {
        const users = await this.dbConnection.getConnection().collection("users").add({
            createdAt: moment().utc().toString(),
            ...parameters
        });
    }
    

    public async getAll() {
        const users = await this.dbConnection.getConnection().collection("users").get();
        const responseArray: any = [];
        users.forEach(userDoc => {
            responseArray.push(userDoc.data());
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