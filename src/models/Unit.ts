import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
} from "typeorm";
import { User } from "./User";
import { Question } from "./Questions";

@Entity()
export class Unit extends BaseEntity {
  
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column("json", { nullable: false, default: {} })
  contents: object;

  @OneToMany(() => Question, (question) => question.unit)
  questions: Question[];
}
