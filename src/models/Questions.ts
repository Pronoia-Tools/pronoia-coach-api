import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  Column,
  BaseEntity,
} from "typeorm";
import { User } from "./User";

@Entity()
export class Question extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => User, (user) => user.workbooks)
  author: User;

  @Column({ length: 100 })
  question: string;

  @Column({ length: 100 })
  answer: string;
}
