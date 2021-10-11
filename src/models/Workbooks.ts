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
import { Images } from "./Images";

@Entity()
export class Workbook extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.workbooks)
  author: User;

  @Column({ length: 100 })
  title: string;

  @Column({ length: 200, default:null })
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

  @Column({ length: 100 })
  tags: "";

  @ManyToMany(() => Unit)
  @JoinTable()
  units: Unit[];

  @OneToMany(() => Images, (images) => images.workbook)
  images: Images[];
}
