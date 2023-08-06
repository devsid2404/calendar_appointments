import { inject, injectable } from "inversify";
import Symbols from "../../Symbols";
import UserRepository from "./user.repository";
import moment from "moment-timezone";
import { availabilityEnd, availabilityStart, getTimeStampAlongWithTimeZone } from "../../commons/time";
import EventService from "../events/event.service";



@injectable()
export default class UserService {

    @inject(Symbols.UserRepository)
    private userRepository: UserRepository;

    @inject(Symbols.EventService)
    private eventService: EventService;




    public async create(parameters) {
        const existingUsers = await this.userRepository.getByEmailId(parameters.email);
        if(!existingUsers.length) {
            await this.userRepository.create(parameters);
        } else {
            throw new Error('User already present');
        }
    }



    public async getAllUsers() {
        return await this.userRepository.getAll();
    }

    public async getUserFreeSlots({id, date, timeZoneOffset}) {
        const user = await this.userRepository.getOneById(id);

        const userAvailabilityStart = moment.utc(
            getTimeStampAlongWithTimeZone({ 
                date,
                hour: availabilityStart.hour,
                minutes: availabilityStart.minute,
                offsetMinutes: user.timeZoneOffset
            }),
             'DD/MM/YYYY HH:mm:ss Z');


        const userAvailabilityEnd = moment.utc(
            getTimeStampAlongWithTimeZone({ 
                date,
                hour: availabilityEnd.hour,
                minutes: availabilityEnd.minute,
                offsetMinutes: user.timeZoneOffset
            }),
             'DD/MM/YYYY HH:mm:ss Z');


        const slots: any = [];

        let slotStartTime = moment(userAvailabilityStart);
        let slotEndTime = moment(slotStartTime).add(30, 'minutes');

        const allEventsForUser = await this.eventService.getAllEventsForUser(id);

        const eventTiming = new Map();
        allEventsForUser.forEach(event => {
            eventTiming.set(event.appointment, 1);
        });


        while(slotStartTime.isBefore(userAvailabilityEnd)) {
            const startTime = moment(slotStartTime).utcOffset(parseInt(timeZoneOffset)).format('YYYY-MM-DDTHH:mm:ssZ');
            const utcStringStartTime = moment(startTime).utc().toString()
            if(!eventTiming.has(utcStringStartTime)) {
                slots.push({
                    startTime: startTime,
                    endTime: moment(slotEndTime).utcOffset(parseInt(timeZoneOffset)).format('YYYY-MM-DDTHH:mm:ssZ'),
                });
            }
            slotStartTime = moment(slotEndTime);
            slotEndTime = moment(slotStartTime).add(30, 'minutes');
        }



        return slots;





    }

}