import {MigrationInterface, QueryRunner} from "typeorm";

export class Units1633622032520 implements MigrationInterface {
    name = 'Units1633622032520'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "unit" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "contents" json NOT NULL DEFAULT '{}', CONSTRAINT "PK_4252c4be609041e559f0c80f58a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "workbook_units_unit" ("workbookId" integer NOT NULL, "unitId" integer NOT NULL, CONSTRAINT "PK_56c133b6c47e49784568a080c2d" PRIMARY KEY ("workbookId", "unitId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_34cf5601558468d59ebcb8f914" ON "workbook_units_unit" ("workbookId") `);
        await queryRunner.query(`CREATE INDEX "IDX_36509d14fa83d0ddc5620b2eec" ON "workbook_units_unit" ("unitId") `);
        await queryRunner.query(`ALTER TABLE "workbook_units_unit" ADD CONSTRAINT "FK_34cf5601558468d59ebcb8f914c" FOREIGN KEY ("workbookId") REFERENCES "workbook"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "workbook_units_unit" ADD CONSTRAINT "FK_36509d14fa83d0ddc5620b2eec3" FOREIGN KEY ("unitId") REFERENCES "unit"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "workbook_units_unit" DROP CONSTRAINT "FK_36509d14fa83d0ddc5620b2eec3"`);
        await queryRunner.query(`ALTER TABLE "workbook_units_unit" DROP CONSTRAINT "FK_34cf5601558468d59ebcb8f914c"`);
        await queryRunner.query(`DROP INDEX "IDX_36509d14fa83d0ddc5620b2eec"`);
        await queryRunner.query(`DROP INDEX "IDX_34cf5601558468d59ebcb8f914"`);
        await queryRunner.query(`DROP TABLE "workbook_units_unit"`);
        await queryRunner.query(`DROP TABLE "unit"`);
    }

}
