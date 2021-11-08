import {MigrationInterface, QueryRunner} from "typeorm";

export class ModelTagCreated1635998704077 implements MigrationInterface {
    name = 'ModelTagCreated1635998704077'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tags" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, CONSTRAINT "PK_e7dc17249a1148a1970748eda99" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "workbook_tags_tags" ("workbookId" integer NOT NULL, "tagsId" integer NOT NULL, CONSTRAINT "PK_cedfc8e53b6ed752817700706e9" PRIMARY KEY ("workbookId", "tagsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_78e1d54f36c4bd9a87ff48a2ff" ON "workbook_tags_tags" ("workbookId") `);
        await queryRunner.query(`CREATE INDEX "IDX_e9e1c95638d228629fb2271161" ON "workbook_tags_tags" ("tagsId") `);
        await queryRunner.query(`ALTER TABLE "public"."workbook" DROP COLUMN "tags"`);
        await queryRunner.query(`ALTER TABLE "workbook_tags_tags" ADD CONSTRAINT "FK_78e1d54f36c4bd9a87ff48a2ff7" FOREIGN KEY ("workbookId") REFERENCES "workbook"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "workbook_tags_tags" ADD CONSTRAINT "FK_e9e1c95638d228629fb22711610" FOREIGN KEY ("tagsId") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "workbook_tags_tags" DROP CONSTRAINT "FK_e9e1c95638d228629fb22711610"`);
        await queryRunner.query(`ALTER TABLE "workbook_tags_tags" DROP CONSTRAINT "FK_78e1d54f36c4bd9a87ff48a2ff7"`);
        await queryRunner.query(`ALTER TABLE "public"."workbook" ADD "tags" character varying(100) NOT NULL`);
        await queryRunner.query(`DROP INDEX "IDX_e9e1c95638d228629fb2271161"`);
        await queryRunner.query(`DROP INDEX "IDX_78e1d54f36c4bd9a87ff48a2ff"`);
        await queryRunner.query(`DROP TABLE "workbook_tags_tags"`);
        await queryRunner.query(`DROP TABLE "tags"`);
    }

}
