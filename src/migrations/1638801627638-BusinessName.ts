import {MigrationInterface, QueryRunner} from "typeorm";

export class BusinessName1638801627638 implements MigrationInterface {
    name = 'BusinessName1638801627638'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."user" ADD "businessname" character varying NOT NULL DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."user" DROP COLUMN "businessname"`);
    }

}
