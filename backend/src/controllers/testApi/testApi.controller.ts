import { controller, httpGet } from "inversify-express-utils";
import moment from "moment";


@controller('/testApi')
export default class InternalTestController {

    @httpGet('/healthCheck')
    public async healthCheck(
        req,
        res,
        next
    ){
        try {
            res.json({message: 'Application running'})
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
            res.json(moment.tz.zonesForCountry(req.query.country, true));
        } catch (err) {
            next(err);
        }
    }

}