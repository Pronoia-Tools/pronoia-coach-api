import {
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  Column,
  BaseEntity,
} from "typeorm";

import { Workbook } from "./Workbooks";
import { Image } from "./Images";
import { Report } from "./Report";
import { Unit } from "./Unit";

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

  @Column({ default: false })
  notify: boolean;

  @Column({ length: 100, default: "" })
  listing_badge: string;

  @Column({ default: false })
  newsletter: boolean;

  @Column({ default: false })
  pre_launch: boolean;

  @Column({ default: false })
  isVerified: boolean;

  @Column({ default: false })
  isCoach: boolean;

  @Column({ default: '' })
  businessname : string;

  @OneToMany(() => Workbook, (workbook) => workbook.author)
  workbooks: Workbook[];
  
  @OneToMany(() => Report, (report) => report.author)
  reports: Report[];

  @OneToMany(() => Image, (image) => image.owner)
  images: Image[];

  @OneToMany(() => Unit, (unit) => unit.owner)
  units: Unit[];

  // add column for strip customer id
  @Column({ length: 100, default: "" })
  stripeCustomerId: string;

  @Column({ default: false })
  authorized: boolean;
}
