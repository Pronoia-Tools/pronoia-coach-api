import {MigrationInterface, QueryRunner} from "typeorm";

export class Workbook1633367433377 implements MigrationInterface {
    name = 'Workbook1633367433377'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "workbook" ("id" SERIAL NOT NULL, "title" character varying(100) NOT NULL, "published" TIMESTAMP NOT NULL, "edition" integer NOT NULL, "language" character varying(100) NOT NULL, "price" double precision NOT NULL, "currency" character varying(100) NOT NULL, "status" character varying(100) NOT NULL, "description" text NOT NULL, "tags" character varying(100) NOT NULL, "authorId" integer, CONSTRAINT "PK_6de08557c1861a10ca59a7e46eb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "workbook" ADD CONSTRAINT "FK_4216c1050139bedfa82c7beed0c" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "workbook" DROP CONSTRAINT "FK_4216c1050139bedfa82c7beed0c"`);
        await queryRunner.query(`DROP TABLE "workbook"`);
    }

}
