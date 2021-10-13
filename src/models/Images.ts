import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  BaseEntity,
} from "typeorm";
import { User } from "./User";

@Entity()
export class Image extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.images)
  owner: User;

  @Column({ type: "text" })
  url: string;

}
