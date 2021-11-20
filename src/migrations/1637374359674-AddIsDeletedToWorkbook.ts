import {MigrationInterface, QueryRunner} from "typeorm";

export class AddIsDeletedToWorkbook1637374359674 implements MigrationInterface {
    name = 'AddIsDeletedToWorkbook1637374359674'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."workbook" ADD "IsDeleted" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."workbook" DROP COLUMN "IsDeleted"`);
    }

}
