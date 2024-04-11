import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTables1712100737487 implements MigrationInterface {
  name = 'CreateTables1712100737487';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "addresses" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "cep" character varying(8) NOT NULL, "city" character varying(255) NOT NULL, "state" character varying(255) NOT NULL, "road" character varying(255) NOT NULL, "neighborhood" character varying(255) NOT NULL, "number" integer NOT NULL, "complement" character varying(255) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_745d8f43d3af10ab8247465e450" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "customers" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, "cpf" character varying(11) NOT NULL, "tel" character varying(11) NOT NULL, "whatsapp" boolean NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "addressId" uuid, CONSTRAINT "REL_9a1ba71f8651412e2003cfa46d" UNIQUE ("addressId"), CONSTRAINT "PK_133ec679a801fab5e070f73d3ea" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "procedure" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, "description" character varying(255) NOT NULL, "price" numeric(10,2) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_9888785b528492e7539d96e3894" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "procedures_perfomed" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "amount" integer NOT NULL, "price" numeric(10,2) NOT NULL, "procedureId" uuid, "saleId" uuid, CONSTRAINT "PK_cd4068bad57d9e0d6a9379f5146" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "product" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, "description" character varying(255) NOT NULL, "amount" integer NOT NULL, "price" numeric(10,2) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "products_sold" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "amount" integer NOT NULL, "price" numeric(10,2) NOT NULL, "productId" uuid, "saleId" uuid, CONSTRAINT "PK_a3db353ea2a013da09938b2aa86" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "sales" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "price" numeric(10,2) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "userId" uuid, "customerId" uuid, CONSTRAINT "PK_4f0bc990ae81dba46da680895ea" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, "password" character varying(255) NOT NULL, "type" character varying(13) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "customers" ADD CONSTRAINT "FK_9a1ba71f8651412e2003cfa46d4" FOREIGN KEY ("addressId") REFERENCES "addresses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "procedures_perfomed" ADD CONSTRAINT "FK_a78004791d314b52b818d01321e" FOREIGN KEY ("procedureId") REFERENCES "procedure"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "procedures_perfomed" ADD CONSTRAINT "FK_bd7a8708b3d8fca3aded9a30451" FOREIGN KEY ("saleId") REFERENCES "sales"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "products_sold" ADD CONSTRAINT "FK_dfc9aab2f2a484b8615d2ec858b" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "products_sold" ADD CONSTRAINT "FK_19ece72dceed357de61d85f02aa" FOREIGN KEY ("saleId") REFERENCES "sales"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "sales" ADD CONSTRAINT "FK_52ff6cd9431cc7687c76f935938" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "sales" ADD CONSTRAINT "FK_3a92cf6add00043cef9833db1cd" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "sales" DROP CONSTRAINT "FK_3a92cf6add00043cef9833db1cd"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sales" DROP CONSTRAINT "FK_52ff6cd9431cc7687c76f935938"`,
    );
    await queryRunner.query(
      `ALTER TABLE "products_sold" DROP CONSTRAINT "FK_19ece72dceed357de61d85f02aa"`,
    );
    await queryRunner.query(
      `ALTER TABLE "products_sold" DROP CONSTRAINT "FK_dfc9aab2f2a484b8615d2ec858b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "procedures_perfomed" DROP CONSTRAINT "FK_bd7a8708b3d8fca3aded9a30451"`,
    );
    await queryRunner.query(
      `ALTER TABLE "procedures_perfomed" DROP CONSTRAINT "FK_a78004791d314b52b818d01321e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "customers" DROP CONSTRAINT "FK_9a1ba71f8651412e2003cfa46d4"`,
    );
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "sales"`);
    await queryRunner.query(`DROP TABLE "products_sold"`);
    await queryRunner.query(`DROP TABLE "product"`);
    await queryRunner.query(`DROP TABLE "procedures_perfomed"`);
    await queryRunner.query(`DROP TABLE "procedure"`);
    await queryRunner.query(`DROP TABLE "customers"`);
    await queryRunner.query(`DROP TABLE "addresses"`);
  }
}
