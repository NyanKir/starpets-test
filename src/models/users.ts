import {
  Table,
  Column,
  Model,
  AutoIncrement,
  PrimaryKey,
  UpdatedAt,
  CreatedAt,
  Default
} from 'sequelize-typescript';
import { NOW } from 'sequelize';

interface IUser {
  id: number;
  balance: number;
  create_at: Date;
}

@Table({
  tableName: 'users',
  timestamps: false
})
export class Users extends Model<IUser> {
  @PrimaryKey
  @AutoIncrement
  @Column('user_id')
  userId: number;

  @Column
  balance: number;

  @Default(NOW)
  @CreatedAt
  @Column
  created_at: Date;
}
