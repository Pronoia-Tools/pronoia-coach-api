import {MigrationInterface, QueryRunner} from "typeorm";

export class UserStripeId1637783410416 implements MigrationInterface {
    name = 'UserStripeId1637783410416'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."user" ADD "stripeCustomerId" character varying(100) NOT NULL DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."user" DROP COLUMN "stripeCustomerId"`);
    }

}
