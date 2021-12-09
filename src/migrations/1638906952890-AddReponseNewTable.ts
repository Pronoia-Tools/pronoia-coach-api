import {MigrationInterface, QueryRunner} from "typeorm";

export class AddReponseNewTable1638906952890 implements MigrationInterface {
    name = 'AddReponseNewTable1638906952890'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "answer" ("id" SERIAL NOT NULL, "answer" text NOT NULL, "ownerId" integer, "questionId" integer, CONSTRAINT "PK_9232db17b63fb1e94f97e5c224f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "answer" ADD CONSTRAINT "FK_93ec8f9a01499387d1e626db65c" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "answer" ADD CONSTRAINT "FK_a4013f10cd6924793fbd5f0d637" FOREIGN KEY ("questionId") REFERENCES "question"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "answer" DROP CONSTRAINT "FK_a4013f10cd6924793fbd5f0d637"`);
        await queryRunner.query(`ALTER TABLE "answer" DROP CONSTRAINT "FK_93ec8f9a01499387d1e626db65c"`);
        await queryRunner.query(`DROP TABLE "answer"`);
    }

}
