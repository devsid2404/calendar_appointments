import { controller, httpGet, httpPost } from "inversify-express-utils";
import Symbols from "../../Symbols";
import * as express from 'express';
import { inject } from "inversify";
import UserService from "../../components/users/user.service";


@controller('/user')
export default class UserController {
    @inject(Symbols.UserService)
    private userService: UserService;

    @httpPost('/create')
    public async createUser(req, res, next) {
        try {
            await this.userService.create(req.body);
            res.json({success: true, data: { message: "New user created successfully"}});
        } catch (err) {
            next(err);
        }
    }

    @httpGet('/get/all')
    public async fetchUsers(req, res, next) {
        try {
            const users = await this.userService.getAllUsers();
            res.json({
                success: true,
                data: users
            });
        } catch (err) {
            next(err);
        }
    }

    @httpGet('/availableSlots')
    public async getFreeSlots(
        req,
        res,
        next
    ){
        try {
            const slots = await this.userService.getUserFreeSlots({ ...req.query});
            res.json({success: true, data: slots})
        } catch (err) {
            next(err);
        }
    }

}