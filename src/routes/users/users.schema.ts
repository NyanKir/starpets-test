import Joi from 'joi';
import { IUsers } from '@/models/users';

export const updateBalanceSchema = Joi.object<Omit<IUsers, 'create_at'>>({
  user_id: Joi.number().min(0).required(),
  balance: Joi.number().min(1).required()
});
