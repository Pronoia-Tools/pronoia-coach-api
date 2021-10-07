import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  BaseEntity,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { User } from "./User";
import { Unit } from "./Unit";

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

  @ManyToMany(() => Unit)
  @JoinTable()
  units: Unit[];
}
