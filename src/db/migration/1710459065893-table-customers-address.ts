import { MigrationInterface, QueryRunner } from "typeorm";

export class TableCustomersAddress1710459065893 implements MigrationInterface {
    name = 'TableCustomersAddress1710459065893'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "addresses" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "cep" character varying(8) NOT NULL, "city" character varying(255) NOT NULL, "state" character varying(255) NOT NULL, "road" character varying(255) NOT NULL, "neighborhood" character varying(255) NOT NULL, "number" integer NOT NULL, "complement" character varying(255) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_745d8f43d3af10ab8247465e450" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "customers" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, "cpf" character varying(11) NOT NULL, "tel" character varying(11) NOT NULL, "whatsapp" boolean NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "addressId" uuid, CONSTRAINT "REL_9a1ba71f8651412e2003cfa46d" UNIQUE ("addressId"), CONSTRAINT "PK_133ec679a801fab5e070f73d3ea" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "customers" ADD CONSTRAINT "FK_9a1ba71f8651412e2003cfa46d4" FOREIGN KEY ("addressId") REFERENCES "addresses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customers" DROP CONSTRAINT "FK_9a1ba71f8651412e2003cfa46d4"`);
        await queryRunner.query(`DROP TABLE "customers"`);
        await queryRunner.query(`DROP TABLE "addresses"`);
    }

}
