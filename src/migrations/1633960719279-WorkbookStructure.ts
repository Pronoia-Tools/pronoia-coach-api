import {MigrationInterface, QueryRunner} from "typeorm";

export class WorkbookStructure1633960719279 implements MigrationInterface {
    name = 'WorkbookStructure1633960719279'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."workbook" ADD "structure" json NOT NULL DEFAULT '{}'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."workbook" DROP COLUMN "structure"`);
    }

}
