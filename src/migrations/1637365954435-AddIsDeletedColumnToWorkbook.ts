import {MigrationInterface, QueryRunner} from "typeorm";

export class AddIsDeletedColumnToWorkbook1637365954435 implements MigrationInterface {
    name = 'AddIsDeletedColumnToWorkbook1637365954435'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."workbook" ADD "IsDeleted" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."workbook" DROP COLUMN "IsDeleted"`);
    }

}
