import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
  ManyToOne,
} from "typeorm";
import { User } from "./User";
import { Question } from "./Questions";

@Entity()
export class Unit extends BaseEntity {
  
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column("json", { nullable: false, default: {type: "doc", content: []} })
  contents: object;

  @Column({default: false})
  deleted: boolean

  @ManyToOne(() => User, (user) => user.images)
  owner: User;

  @OneToMany(() => Question, (question) => question.unit)
  questions: Question[];
}
