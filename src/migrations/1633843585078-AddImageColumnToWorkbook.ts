import {MigrationInterface, QueryRunner} from "typeorm";

export class AddImageColumnToWorkbook1633843585078 implements MigrationInterface {
    name = 'AddImageColumnToWorkbook1633843585078'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "workbook" ADD "image" character varying(200)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "workbook" DROP COLUMN "image"`);
    }

}
