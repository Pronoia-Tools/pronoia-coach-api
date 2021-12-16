import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  BaseEntity,
  ManyToMany,
  JoinTable,
  OneToMany,
} from "typeorm";
import { User } from "./User";
import { Unit } from "./Unit";
import { Tags } from "./Tags";
import { shareWB } from "./shareWB";

@Entity()
export class Workbook extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.workbooks)
  author: User;

  @Column({ length: 100 })
  title: string;

  @Column({ length: 500, default:null })
  image: string;

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

  @Column('boolean', {default: false})
  IsDeleted: boolean = false;

  @Column("json", { nullable: false, default: {tree: []} })
  structure: StructureObject;

  @OneToMany(() => shareWB, shared => shared.id)
  sharedWB: shareWB[];

  @ManyToMany(() => Unit)
  @JoinTable()
  units: Unit[];

  @ManyToMany(() => Tags)
  @JoinTable()
  tags: Tags[];

  @ManyToMany(() => User)
  @JoinTable()
  users: User[];

}

interface StructureObject {
  tree: Array<object>;
}