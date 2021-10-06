import {MigrationInterface, QueryRunner} from "typeorm";

export class Question1633554105740 implements MigrationInterface {
    name = 'Question1633554105740'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "question" ("id" SERIAL NOT NULL, "question" character varying(100) NOT NULL, "answer" character varying(100) NOT NULL, CONSTRAINT "PK_21e5786aa0ea704ae185a79b2d5" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "question"`);
    }

}
