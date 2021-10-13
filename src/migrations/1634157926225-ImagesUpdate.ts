import {MigrationInterface, QueryRunner} from "typeorm";

export class ImagesUpdate1634157926225 implements MigrationInterface {
    name = 'ImagesUpdate1634157926225'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "image" ("id" SERIAL NOT NULL, "url" text NOT NULL, "ownerId" integer, CONSTRAINT "PK_d6db1ab4ee9ad9dbe86c64e4cc3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "image" ADD CONSTRAINT "FK_132fcc8d44e719a21ac7a372c33" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "image" DROP CONSTRAINT "FK_132fcc8d44e719a21ac7a372c33"`);
        await queryRunner.query(`DROP TABLE "image"`);
    }

}
