import {MigrationInterface, QueryRunner} from "typeorm";

export class AddNotifyColumnToUser1634342249029 implements MigrationInterface {
    name = 'AddNotifyColumnToUser1634342249029'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."user" ADD "notify" boolean`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."user" DROP COLUMN "notify"`);
    }

}
