import {
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  Column,
  BaseEntity,
} from "typeorm";
import { Workbook } from "./Workbooks";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  uuid: string;

  @Column({ length: 100 })
  firstName: string;

  @Column({ length: 100 })
  lastName: string;

  @Column({ length: 100 })
  email: string;

  password: string;
  token: string;

  @Column({ length: 100 })
  country: string;

  @OneToMany(() => Workbook, (workbook) => workbook.author)
  workbooks: Workbook[];
}
