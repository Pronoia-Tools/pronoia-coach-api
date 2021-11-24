import {MigrationInterface, QueryRunner} from "typeorm";

export class UserAuthorized1637792153176 implements MigrationInterface {
    name = 'UserAuthorized1637792153176'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."user" ADD "autorized" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."user" DROP COLUMN "autorized"`);
    }

}
