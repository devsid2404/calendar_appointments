import { controller, httpGet, httpPost } from "inversify-express-utils";
import Symbols from "../../Symbols";
import * as express from 'express';
import { inject } from "inversify";
import UserService from "../../components/users/user.service";
import EventService from "../../components/events/event.service";
import moment from "moment";


@controller('/event')
export default class EventController {
    @inject(Symbols.UserService)
    private userService: UserService;

    @inject(Symbols.EventService)
    private eventService: EventService;

    @httpPost('/create')
    public async createEvent(req, res, next) {
        try {
            const { userId, timestamp, name } = req.body;
            const timestampToBook: any = moment(timestamp, 'YYYY-MM-DDTHH:mm:ssZ');
            const slots = await this.userService.getUserFreeSlots({ 
                id: userId,
                date: timestampToBook.format("DD/MM/YYYY"),
                timeZoneOffset: timestampToBook._tzm
            });

            const slotPresent = slots.some(slot => moment(slot.startTime).isSame(timestampToBook._i));

            if(slotPresent) {
                await this.eventService.createEvent({
                    userId, 
                    name,
                    appointment: moment(timestampToBook).utc().toString()
            });
        } else {
            throw new Error('Cannot find available slot');
        }
            res.json({success: true});
        } catch (err: any) {
            res.status(400).json({message : err.message});
        }
    }

    @httpGet('/get/all')
    public async fetchAllEvents(req, res, next) {
        try {
            const eventForUser = await this.eventService.getAllEventsForUser(req.query.userId);
            res.json({
                success: true,
                data: eventForUser
            });
        } catch (err) {
            console.log('err===>', err);
            res.status(400).json({message : ''});
        }
    }

}