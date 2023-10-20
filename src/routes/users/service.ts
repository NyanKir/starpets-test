import { IUsers, Users } from '@/models/users';

export interface IUsersService {
  createUser: () => Promise<Users>;
  update: (user: Omit<IUsers, 'create_at'>) => Promise<Users | undefined>;
}

export class UsersService implements IUsersService {
  constructor() {}

  async createUser() {
    return Users.create({ balance: 10_000 });
  }

  async update(user: Omit<IUsers, 'create_at'>) {
    const affected = await Users.decrement(
      {
        balance: user.balance
      },
      {
        where: {
          user_id: user.user_id
        }
      }
    );
    return affected[0][0][0];
  }
}
