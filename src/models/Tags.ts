import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
} from "typeorm";


@Entity()
export class Tags extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ length: 100 })
  name: string;
}
