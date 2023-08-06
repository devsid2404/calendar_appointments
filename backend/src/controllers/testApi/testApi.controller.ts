import { controller, httpGet } from "inversify-express-utils";
import moment from "moment";


@controller('/testApi')
export default class InternalTestController {

    @httpGet('/get')
    public async get(
        req,
        res,
        next
    ){
        try {

            console.log('reached here');
            res.json({message: 'Test Api running'})
        } catch (err) {
            next(err);
        }
    }

    @httpGet('/getTimeZones')
    public async getTimeZone(
        req,
        res,
        next
    ){
        try {

            console.log('reached here');
            res.json(moment.tz.zonesForCountry(req.query.country, true));
        } catch (err) {
            next(err);
        }
    }

}