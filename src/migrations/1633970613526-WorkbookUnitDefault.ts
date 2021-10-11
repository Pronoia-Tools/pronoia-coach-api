import {MigrationInterface, QueryRunner} from "typeorm";

export class WorkbookUnitDefault1633970613526 implements MigrationInterface {
    name = 'WorkbookUnitDefault1633970613526'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."unit" ALTER COLUMN "contents" SET DEFAULT '{"type":"doc","content":[]}'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."unit" ALTER COLUMN "contents" SET DEFAULT '{}'`);
    }

}
