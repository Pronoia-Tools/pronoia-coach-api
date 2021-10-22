import {MigrationInterface, QueryRunner} from "typeorm";

export class UserIsVerified1634767827517 implements MigrationInterface {
    name = 'UserIsVerified1634767827517'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."user" ADD "isVerified" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."user" DROP COLUMN "isVerified"`);
    }

}
