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
  workbook: Unit[];

  @Column({ length: 100 })
  question: string;

  @Column({ length: 100, nullable: true })
  answer: string;
}
