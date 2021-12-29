import {MigrationInterface, QueryRunner} from "typeorm";

export class TagsAddAutoIncrement1636609694272 implements MigrationInterface {
    name = 'TagsAddAutoIncrement1636609694272'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."workbook" DROP COLUMN "image"`);
        await queryRunner.query(`ALTER TABLE "public"."workbook" ADD "image" character varying(200)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."workbook" DROP COLUMN "image"`);
        await queryRunner.query(`ALTER TABLE "public"."workbook" ADD "image" character varying(500)`);
    }

}
