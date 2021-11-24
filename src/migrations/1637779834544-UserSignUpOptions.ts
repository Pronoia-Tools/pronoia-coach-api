import {MigrationInterface, QueryRunner} from "typeorm";

export class UserSignUpOptions1637779834544 implements MigrationInterface {
    name = 'UserSignUpOptions1637779834544'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."user" ADD "listing_badge" character varying(100) NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "public"."user" ADD "newsletter" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "public"."user" ADD "pre_launch" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."user" DROP COLUMN "pre_launch"`);
        await queryRunner.query(`ALTER TABLE "public"."user" DROP COLUMN "newsletter"`);
        await queryRunner.query(`ALTER TABLE "public"."user" DROP COLUMN "listing_badge"`);
    }

}
