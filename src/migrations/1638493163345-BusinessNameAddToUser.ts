import {MigrationInterface, QueryRunner} from "typeorm";

export class BusinessNameAddToUser1638493163345 implements MigrationInterface {
    name = 'BusinessNameAddToUser1638493163345'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."user" ADD "businessname" character varying NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "public"."workbook" DROP COLUMN "image"`);
        await queryRunner.query(`ALTER TABLE "public"."workbook" ADD "image" character varying(500)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."workbook" DROP COLUMN "image"`);
        await queryRunner.query(`ALTER TABLE "public"."workbook" ADD "image" character varying(200)`);
        await queryRunner.query(`ALTER TABLE "public"."user" DROP COLUMN "businessname"`);
    }

}
