import { MigrationInterface, QueryRunner } from "typeorm";

export class TableProcedure1710445688972 implements MigrationInterface {
    name = 'TableProcedure1710445688972'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "procedure" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, "description" character varying(255) NOT NULL, "price" numeric(10,2) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_9888785b528492e7539d96e3894" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "description" character varying(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "description" character varying NOT NULL`);
        await queryRunner.query(`DROP TABLE "procedure"`);
    }

}
