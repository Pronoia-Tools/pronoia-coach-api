import {MigrationInterface, QueryRunner} from "typeorm";

export class UserIsCoach1640092997843 implements MigrationInterface {
    name = 'UserIsCoach1640092997843'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."user" ADD "isCoach" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."user" DROP COLUMN "isCoach"`);
    }

}
