import { RouteHandle } from '@/declarations/route';
import { NextFunction, Request, Response } from 'express';
import { IUsersService } from '@/routes/users/service';
import { IUsers } from '@/models/users';
import { HttpException } from '@exceptions/http.exception';
import { DatabaseError } from 'sequelize';

export interface IController {
  updateBalance: RouteHandle<void>;
  createUser: RouteHandle<void>;
}

export class UsersController implements IController {
  constructor(readonly service: IUsersService) {}

  async updateBalance(
    req: Request<unknown, unknown, Omit<IUsers, 'create_at'>>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const user = await this.service.update(req.body);
      if (!user) throw new HttpException(400, `Bad request, user not found`);
      res.send(user);
    } catch (e: HttpException | unknown) {
      if (e instanceof DatabaseError) {
        console.log(JSON.stringify(e));
        // @ts-ignore TODO: found interface/class for condition
        if (e.parent.code === '23514') {
          next(new HttpException(400, `Bad request, Balance too low to minus`));
        }
      }
      next(e);
    }
  }

  async createUser(req: Request, res: Response): Promise<void> {
    const user = await this.service.createUser();
    res.send(user.toJSON());
  }
}
