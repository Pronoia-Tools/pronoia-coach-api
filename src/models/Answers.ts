import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  BaseEntity,
} from "typeorm";
import { Question } from "./Questions";

import { User } from "./User";

@Entity()
export class Answer extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;
  
  @Column({ type: "text" })
  answer: string;
  
  @ManyToOne(() => User, (user) => user.answers)
  owner: User;

  @ManyToOne(() => Question, (question) => question.answers)
  question: Question;
}
