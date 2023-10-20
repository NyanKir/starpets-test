import {
  Table,
  Column,
  Model,
  AutoIncrement,
  PrimaryKey,
  CreatedAt,
  Default,
  NotNull,
  AllowNull
} from 'sequelize-typescript';
import { DataTypes, NOW } from 'sequelize';

export interface IUsers {
  user_id: number;
  balance: number;
  create_at: Date;
}

@Table({
  tableName: 'users',
  timestamps: false
})
export class Users extends Model<IUsers> {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Column
  user_id: number;

  @AllowNull(false)
  @Column
  balance: number;

  @Default(NOW)
  @AllowNull(false)
  @CreatedAt
  @Column
  created_at: Date;
}
