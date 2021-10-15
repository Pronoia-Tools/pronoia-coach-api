import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne
} from "typeorm";

import { User } from "./User";

@Entity()
export class Report extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text" })
  report: string;
  
  @Column({ type: "text" })
  description: string;

  @Column({ length: 100 })
  path: string;

  @ManyToOne(() => User, (user) => user.reports)
  author: User;
}