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

  @Column('boolean', {default: false})
  isPublic: boolean = false;

  @Column("json", { nullable: false, default: {tree: []} })
  structure: StructureObject;

  @ManyToMany(() => Unit)
  @JoinTable()
  units: Unit[];

  @ManyToMany(() => Tags)
  @JoinTable()
  tags: Tags[];

}

interface StructureObject {
  tree: Array<object>;
}