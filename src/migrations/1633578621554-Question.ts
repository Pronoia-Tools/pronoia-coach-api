import {MigrationInterface, QueryRunner} from "typeorm";

export class Question1633578621554 implements MigrationInterface {
    name = 'Question1633578621554'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."question" ADD "authorId" integer`);
        await queryRunner.query(`ALTER TABLE "public"."question" ALTER COLUMN "answer" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."question" ADD CONSTRAINT "FK_75fc761f2752712276be38e7d13" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."question" DROP CONSTRAINT "FK_75fc761f2752712276be38e7d13"`);
        await queryRunner.query(`ALTER TABLE "public"."question" ALTER COLUMN "answer" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."question" DROP COLUMN "authorId"`);
    }

}
