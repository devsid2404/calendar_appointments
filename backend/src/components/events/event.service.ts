import { inject, injectable } from "inversify";
import Symbols from "../../Symbols";
import EventRepository from "./event.repository";
import { IEvent } from "./event.interface";
import moment from "moment";



@injectable()
export default class EventService {
    @inject(Symbols.EventRepository)
    private eventRepository: EventRepository;

    public async createEvent(parameters) {
        await this.eventRepository.create(parameters);
    }

    public getAllEventsForUser = async(userId: string, startDate: string, endDate: string)
        :Promise<IEvent[]> => await this.eventRepository.getByUserId(userId, startDate, endDate);


    public async getAllEventsForUserHashMap(userId, startDate, endDate):Promise<Map<string, 1>> {
        const allEvents = await this.eventRepository.getByUserId(userId, startDate, endDate);
        const eventTiming = new Map();
        allEvents.forEach(event => {
            eventTiming.set(event.appointment, 1);
        });
        return eventTiming;
    }


}