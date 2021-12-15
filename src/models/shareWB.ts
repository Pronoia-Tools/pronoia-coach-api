import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
} from "typeorm";

import { Workbook } from "./Workbooks";
import { User } from "./User";

@Entity()
export class shareWB extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("simple-json")
  permissions: {};

  @ManyToOne(() => User, (user) => user.id)
  owners: User[];

  @ManyToOne(() => Workbook, (workbook) => workbook.id)
  workbooks: Workbook;
}
