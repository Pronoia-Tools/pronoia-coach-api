import {MigrationInterface, QueryRunner} from "typeorm";

export class Report1634259936356 implements MigrationInterface {
    name = 'Report1634259936356'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "report" ("id" SERIAL NOT NULL, "report" text NOT NULL, "description" text NOT NULL, "path" character varying(100) NOT NULL, "authorId" integer, CONSTRAINT "PK_99e4d0bea58cba73c57f935a546" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "report" ADD CONSTRAINT "FK_0a02cd5ccfc6544a17005a604fd" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "report" DROP CONSTRAINT "FK_0a02cd5ccfc6544a17005a604fd"`);
        await queryRunner.query(`DROP TABLE "report"`);
    }

}
