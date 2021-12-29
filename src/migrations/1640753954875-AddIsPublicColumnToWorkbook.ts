import {MigrationInterface, QueryRunner} from "typeorm";

export class AddIsPublicColumnToWorkbook1640753954875 implements MigrationInterface {
    name = 'AddIsPublicColumnToWorkbook1640753954875'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."workbook" ADD "isPublic" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."workbook" DROP COLUMN "isPublic"`);
    }

}
