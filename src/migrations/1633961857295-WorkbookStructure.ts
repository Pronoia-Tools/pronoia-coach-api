import {MigrationInterface, QueryRunner} from "typeorm";

export class WorkbookStructure1633961857295 implements MigrationInterface {
    name = 'WorkbookStructure1633961857295'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."workbook" ALTER COLUMN "structure" SET DEFAULT '{"tree":[]}'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."workbook" ALTER COLUMN "structure" SET DEFAULT '{}'`);
    }

}
