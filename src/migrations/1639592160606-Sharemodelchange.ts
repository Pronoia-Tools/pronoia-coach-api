import {MigrationInterface, QueryRunner} from "typeorm";

export class Sharemodelchange1639592160606 implements MigrationInterface {
    name = 'Sharemodelchange1639592160606'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."share_wb" DROP CONSTRAINT "FK_5ae27e360ae4122097ca1785c58"`);
        await queryRunner.query(`ALTER TABLE "public"."share_wb" DROP CONSTRAINT "FK_9721fb4128c41942db24fbfdfc0"`);
        await queryRunner.query(`ALTER TABLE "public"."share_wb" DROP COLUMN "ownersIdId"`);
        await queryRunner.query(`ALTER TABLE "public"."share_wb" DROP COLUMN "workbooksIdId"`);
        await queryRunner.query(`ALTER TABLE "public"."share_wb" ADD "ownersId" integer`);
        await queryRunner.query(`ALTER TABLE "public"."share_wb" ADD "workbooksId" integer`);
        await queryRunner.query(`ALTER TABLE "public"."share_wb" ADD CONSTRAINT "FK_4565fd67330bce505a06a391e92" FOREIGN KEY ("ownersId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."share_wb" ADD CONSTRAINT "FK_dff2bf0955ec5fb69bff8d84aa1" FOREIGN KEY ("workbooksId") REFERENCES "workbook"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."share_wb" DROP CONSTRAINT "FK_dff2bf0955ec5fb69bff8d84aa1"`);
        await queryRunner.query(`ALTER TABLE "public"."share_wb" DROP CONSTRAINT "FK_4565fd67330bce505a06a391e92"`);
        await queryRunner.query(`ALTER TABLE "public"."share_wb" DROP COLUMN "workbooksId"`);
        await queryRunner.query(`ALTER TABLE "public"."share_wb" DROP COLUMN "ownersId"`);
        await queryRunner.query(`ALTER TABLE "public"."share_wb" ADD "workbooksIdId" integer`);
        await queryRunner.query(`ALTER TABLE "public"."share_wb" ADD "ownersIdId" integer`);
        await queryRunner.query(`ALTER TABLE "public"."share_wb" ADD CONSTRAINT "FK_9721fb4128c41942db24fbfdfc0" FOREIGN KEY ("workbooksIdId") REFERENCES "workbook"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."share_wb" ADD CONSTRAINT "FK_5ae27e360ae4122097ca1785c58" FOREIGN KEY ("ownersIdId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
