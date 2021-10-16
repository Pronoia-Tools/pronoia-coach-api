import {MigrationInterface, QueryRunner} from "typeorm";

export class UnitLibrary1634411456325 implements MigrationInterface {
    name = 'UnitLibrary1634411456325'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."unit" ADD "deleted" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "public"."unit" ADD "ownerId" integer`);
        await queryRunner.query(`UPDATE "public"."user" SET "notify"=false WHERE "notify" IS NULL`);
        await queryRunner.query(`ALTER TABLE "public"."user" ALTER COLUMN "notify" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."user" ALTER COLUMN "notify" SET DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "public"."unit" ADD CONSTRAINT "FK_624de45d489ffabc237c287e2b0" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."unit" DROP CONSTRAINT "FK_624de45d489ffabc237c287e2b0"`);
        await queryRunner.query(`ALTER TABLE "public"."user" ALTER COLUMN "notify" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "public"."user" ALTER COLUMN "notify" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."unit" DROP COLUMN "ownerId"`);
        await queryRunner.query(`ALTER TABLE "public"."unit" DROP COLUMN "deleted"`);
    }

}
