import {MigrationInterface, QueryRunner} from "typeorm";

export class UserAuthorziedTypo1638804941845 implements MigrationInterface {
    name = 'UserAuthorziedTypo1638804941845'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."user" RENAME COLUMN "autorized" TO "authorized"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."user" RENAME COLUMN "authorized" TO "autorized"`);
    }

}
