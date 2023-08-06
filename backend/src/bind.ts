import { Container } from "inversify";
import Service_Identifier from "./Symbols";
import InternalTestAPI from "./controllers/testApi/testApi.controller";
import DatabaseConnection from "./db/dataBaseConnection";
import AppServer from "./AppServer";
import UserController from "./controllers/user/user.controller";
import UserService from "./components/users/user.service";
import UserRepository from "./components/users/user.repository";
import EventController from "./controllers/event/event.controller";
import EventService from "./components/events/event.service";
import EventRepository from "./components/events/event.repository";




export async function bind(container: Container): Promise<void> {

    // DB
    container.bind<DatabaseConnection>(Service_Identifier.DatabaseConnection)
    .to(DatabaseConnection);

    container.bind<AppServer>(Service_Identifier.AppServer).to(AppServer);

    // Bind Controllers
    container.bind<InternalTestAPI>(Service_Identifier.InternalTestController)
    .to(InternalTestAPI);

    container.bind<UserController>(Service_Identifier.UserController)
    .to(UserController);

    container.bind<EventController>(Service_Identifier.EventController)
    .to(EventController);



    //Component

    //User

    container.bind<UserService>(Service_Identifier.UserService)
    .to(UserService);

    container.bind<UserRepository>(Service_Identifier.UserRepository)
    .to(UserRepository);


    //Event

    container.bind<EventService>(Service_Identifier.EventService)
    .to(EventService);

    container.bind<EventRepository>(Service_Identifier.EventRepository)
    .to(EventRepository);


}