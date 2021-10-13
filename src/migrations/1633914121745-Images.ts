import {MigrationInterface, QueryRunner} from "typeorm";

export class Images1633914121745 implements MigrationInterface {
    name = 'Images1633914121745'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "images" ("id" SERIAL NOT NULL, "url" text NOT NULL, "workbookId" integer, CONSTRAINT "PK_1fe148074c6a1a91b63cb9ee3c9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "images" ADD CONSTRAINT "FK_42a97a14a0ded6bfbcb7e5e96d3" FOREIGN KEY ("workbookId") REFERENCES "workbook"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "images" DROP CONSTRAINT "FK_42a97a14a0ded6bfbcb7e5e96d3"`);
        await queryRunner.query(`DROP TABLE "images"`);
    }

}
