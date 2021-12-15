import {MigrationInterface, QueryRunner} from "typeorm";

export class shareWb1639581628190 implements MigrationInterface {
    name = 'shareWb1639581628190'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "share_wb" ("id" SERIAL NOT NULL, "permissions" text NOT NULL, "ownersId" integer, "workbooksId" integer, CONSTRAINT "PK_962001ca2138395f591c8761897" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "workbook_users_user" ("workbookId" integer NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_014f2f418343ac10c7029279d49" PRIMARY KEY ("workbookId", "userId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_66df589f3f07ac7884b31333b4" ON "workbook_users_user" ("workbookId") `);
        await queryRunner.query(`CREATE INDEX "IDX_89e9fa780184718f622ffac444" ON "workbook_users_user" ("userId") `);
        await queryRunner.query(`ALTER TABLE "share_wb" ADD CONSTRAINT "FK_4565fd67330bce505a06a391e92" FOREIGN KEY ("ownersId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "share_wb" ADD CONSTRAINT "FK_dff2bf0955ec5fb69bff8d84aa1" FOREIGN KEY ("workbooksId") REFERENCES "workbook"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "workbook_users_user" ADD CONSTRAINT "FK_66df589f3f07ac7884b31333b45" FOREIGN KEY ("workbookId") REFERENCES "workbook"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "workbook_users_user" ADD CONSTRAINT "FK_89e9fa780184718f622ffac4446" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "workbook_users_user" DROP CONSTRAINT "FK_89e9fa780184718f622ffac4446"`);
        await queryRunner.query(`ALTER TABLE "workbook_users_user" DROP CONSTRAINT "FK_66df589f3f07ac7884b31333b45"`);
        await queryRunner.query(`ALTER TABLE "share_wb" DROP CONSTRAINT "FK_dff2bf0955ec5fb69bff8d84aa1"`);
        await queryRunner.query(`ALTER TABLE "share_wb" DROP CONSTRAINT "FK_4565fd67330bce505a06a391e92"`);
        await queryRunner.query(`DROP INDEX "IDX_89e9fa780184718f622ffac444"`);
        await queryRunner.query(`DROP INDEX "IDX_66df589f3f07ac7884b31333b4"`);
        await queryRunner.query(`DROP TABLE "workbook_users_user"`);
        await queryRunner.query(`DROP TABLE "share_wb"`);
    }

}
