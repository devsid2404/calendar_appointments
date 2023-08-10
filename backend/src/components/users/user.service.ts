import { inject, injectable } from "inversify";
import Symbols from "../../Symbols";
import UserRepository from "./user.repository";
import moment from "moment-timezone";
import { availabilityEnd, availabilityStart, getTimeStampAlongWithTimeZone } from "../../commons/time";
import EventService from "../events/event.service";
import { IFreeSlots, IUser } from "./user.interface";
import DuplicateError from "../../commons/errors/Duplicate.error";
import ValidationError from "../../commons/errors/validation.error";



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
            throw new DuplicateError('User already present with same email id');
        }
    }

    public async getAllUsers():Promise<IUser[]> {
        return await this.userRepository.getAll();
    }

    public getOneById = async (userId) => await this.userRepository.getOneById(userId);

    public async getUserFreeSlots({id, date, timeZoneOffset}):Promise<IFreeSlots[]> {
        const user = await this.userRepository.getOneById(id);
        if(!user) throw new ValidationError('Cannot find given user');
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


        const slots: IFreeSlots[] = [];

        let slotStartTime = moment(userAvailabilityStart);
        let slotEndTime = moment(slotStartTime).add(30, 'minutes');

        const allEventsForUser = await this.eventService.getAllEventsForUserHashMap(id);

        while(slotStartTime.isBefore(userAvailabilityEnd)) {
            const startTime = moment(slotStartTime).utcOffset(parseInt(timeZoneOffset)).format('YYYY-MM-DDTHH:mm:ssZ');
            if(!allEventsForUser.has(moment(startTime).utc().toString())) {
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