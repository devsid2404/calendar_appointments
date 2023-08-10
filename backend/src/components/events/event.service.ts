import { inject, injectable } from "inversify";
import Symbols from "../../Symbols";
import EventRepository from "./event.repository";
import { IEvent } from "./event.interface";



@injectable()
export default class EventService {
    @inject(Symbols.EventRepository)
    private eventRepository: EventRepository;

    public async createEvent(parameters) {
        await this.eventRepository.create(parameters);
    }

    public getAllEventsForUser = async(userId: string)
        :Promise<IEvent[]> => await this.eventRepository.getByUserId(userId);


    public async getAllEventsForUserHashMap(userId):Promise<Map<string, 1>> {
        const allEvents = await this.eventRepository.getByUserId(userId);
        const eventTiming = new Map();
        allEvents.forEach(event => {
            eventTiming.set(event.appointment, 1);
        });
        return eventTiming;
    }


}