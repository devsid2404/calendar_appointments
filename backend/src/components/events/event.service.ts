import { inject, injectable } from "inversify";
import Symbols from "../../Symbols";
import EventRepository from "./event.repository";



@injectable()
export default class EventService {

    @inject(Symbols.EventRepository)
    private eventRepository: EventRepository;




    public async createEvent(parameters) {
        await this.eventRepository.create(parameters);
    }



    public async getAllEventsForUser(userId) {
        const allEvents = await this.eventRepository.getByUserId(userId);
        return allEvents;

    }


}