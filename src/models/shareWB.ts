import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  JoinColumn,
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
  @JoinColumn({name:'ownersId'})
  ownersId: User[];

  @ManyToOne(() => Workbook, (workbook) => workbook.id)
  @JoinColumn({name:'workbooksId'})
  workbooksId: Workbook;
}
