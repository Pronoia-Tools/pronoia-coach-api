import {MigrationInterface, QueryRunner} from "typeorm";

export class User1632952426635 implements MigrationInterface {
    name = 'User1632952426635'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "uuid" varchar(100) NOT NULL, "firstName" varchar(100) NOT NULL, "lastName" varchar(100) NOT NULL, "email" varchar(100) NOT NULL, "country" varchar(100) NOT NULL)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
