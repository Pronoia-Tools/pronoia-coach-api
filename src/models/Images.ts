import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  BaseEntity,
} from "typeorm";
import { Unit } from "./Unit";
import { Workbook } from "./Workbooks";

@Entity()
export class Images extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Workbook, (workbook) => workbook.images)
  workbook: Workbook;

  @Column({ type: "text" })
  url: string;

}
