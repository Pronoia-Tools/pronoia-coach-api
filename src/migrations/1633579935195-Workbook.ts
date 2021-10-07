import {MigrationInterface, QueryRunner} from "typeorm";

export class Workbook1633579935195 implements MigrationInterface {
    name = 'Workbook1633579935195'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."question" ADD "workbookId" integer`);
        await queryRunner.query(`ALTER TABLE "public"."question" ALTER COLUMN "answer" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."question" ADD CONSTRAINT "FK_45f7f39de71b29c1006eb7a57ef" FOREIGN KEY ("workbookId") REFERENCES "workbook"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."question" DROP CONSTRAINT "FK_45f7f39de71b29c1006eb7a57ef"`);
        await queryRunner.query(`ALTER TABLE "public"."question" ALTER COLUMN "answer" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."question" DROP COLUMN "workbookId"`);
    }

}
