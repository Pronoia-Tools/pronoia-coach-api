import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  BaseEntity,
} from "typeorm";
import { Workbook } from "./Workbooks";

@Entity()
export class Question extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Workbook, (workbook) => workbook.questions)
  workbook: Workbook[];

  @Column({ length: 100 })
  question: string;

  @Column({ length: 100, nullable: true })
  answer: string;
}
