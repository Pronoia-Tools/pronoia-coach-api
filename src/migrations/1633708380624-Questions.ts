import {MigrationInterface, QueryRunner} from "typeorm";

export class Questions1633708380624 implements MigrationInterface {
    name = 'Questions1633708380624'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "question" ("id" SERIAL NOT NULL, "question" text NOT NULL, "unitId" integer, CONSTRAINT "PK_21e5786aa0ea704ae185a79b2d5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "question" ADD CONSTRAINT "FK_3a5de2cf8b2dbd703ce25d9266b" FOREIGN KEY ("unitId") REFERENCES "unit"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "question" DROP CONSTRAINT "FK_3a5de2cf8b2dbd703ce25d9266b"`);
        await queryRunner.query(`DROP TABLE "question"`);
    }

}
