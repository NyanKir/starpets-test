import {
  Table,
  Column,
  Model,
  AutoIncrement,
  PrimaryKey,
  CreatedAt,
  Default,
  AllowNull
} from 'sequelize-typescript';
import { NOW } from 'sequelize';

export interface IJobs {
  job_id: number;
  job_name: string;
  pid: number;
  executed_at: Date;
  finished_at?: Date;
}

@Table({
  tableName: 'jobs',
  timestamps: false
})
export class Jobs extends Model<IJobs> {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Column
  job_id: number;

  @AllowNull(false)
  @Column
  job_name: string;

  @AllowNull(false)
  @Column
  pid: number;

  @Default(NOW)
  @AllowNull(false)
  @CreatedAt
  @Column
  executed_at: Date;

  @AllowNull(true)
  @Column
  finished_at?: Date;
}
