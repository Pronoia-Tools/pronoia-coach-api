import {MigrationInterface, QueryRunner} from "typeorm";

export class AddMembershipColumnToUser1636694873089 implements MigrationInterface {
    name = 'AddMembershipColumnToUser1636694873089'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."user" ADD "membership" character varying(20)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."user" DROP COLUMN "membership"`);
    }

}
