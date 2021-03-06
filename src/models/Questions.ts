import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  BaseEntity,
} from "typeorm";
import { Unit } from "./Unit";

@Entity()
export class Question extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Unit, (unit) => unit.questions)
  unit: Unit;

  @Column({ type: "text" })
  question: string;

}
