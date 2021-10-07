import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, BaseEntity } from "typeorm";
import { User } from './User'

@Entity()
export class Unit extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 100})
    name: string;

    @Column('json', { nullable: false, default: {} })
    contents: object;

}