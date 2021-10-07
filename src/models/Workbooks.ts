import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  BaseEntity,
  OneToMany,
} from "typeorm";
import { User } from "./User";
import { Question } from "./Questions";

@Entity()
export class Workbook extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.workbooks)
  author: User;

  @Column({ length: 100 })
  title: string;

  @Column({ type: "timestamp" })
  published: Date;

  @Column()
  edition: number;

  @Column({ length: 100 })
  language: string;

  @Column({ type: "float" })
  price: number;

  @Column({ length: 100 })
  currency: string;

  @Column({ length: 100 })
  status: string;

  @Column({ type: "text" })
  description: string;

  @Column({ length: 100 })
  tags: "";

  @OneToMany(() => Question, (question) => question.question)
  questions: Question[];
}
