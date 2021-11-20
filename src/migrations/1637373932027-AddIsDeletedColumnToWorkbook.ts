import {MigrationInterface, QueryRunner} from "typeorm";

export class AddIsDeletedColumnToWorkbook1637373932027 implements MigrationInterface {
    name = 'AddIsDeletedColumnToWorkbook1637373932027'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."user" DROP COLUMN "membership"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."user" ADD "membership" character varying(20)`);
    }

}
