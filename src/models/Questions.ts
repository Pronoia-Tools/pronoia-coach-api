import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  BaseEntity,
  OneToMany
} from "typeorm";
import { Answer } from "./Answers";
import { Unit } from "./Unit";
@Entity()
export class Question extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Unit, (unit) => unit.questions)
  unit: Unit;

  @OneToMany(() => Answer, (answer) => answer.owner)
  answers: Answer[];

  @Column({ type: "text" })
  question: string;

}
