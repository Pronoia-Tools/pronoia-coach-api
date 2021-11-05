import {MigrationInterface, QueryRunner} from "typeorm";

export class WorkbbokImage1636119105906 implements MigrationInterface {
    name = 'WorkbbokImage1636119105906'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."workbook" DROP COLUMN "image"`);
        await queryRunner.query(`ALTER TABLE "public"."workbook" ADD "image" character varying(500)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."workbook" DROP COLUMN "image"`);
        await queryRunner.query(`ALTER TABLE "public"."workbook" ADD "image" character varying(200)`);
    }

}
