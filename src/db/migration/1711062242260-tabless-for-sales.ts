import { MigrationInterface, QueryRunner } from "typeorm";

export class TablessForSales1711062242260 implements MigrationInterface {
    name = 'TablessForSales1711062242260'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "procedures_perfomed" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "amount" integer NOT NULL, "price" numeric(10,2) NOT NULL, "procedureId" uuid, "saleId" uuid, CONSTRAINT "PK_cd4068bad57d9e0d6a9379f5146" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "products_sold" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "amount" integer NOT NULL, "price" numeric(10,2) NOT NULL, "productId" uuid, "saleId" uuid, CONSTRAINT "PK_a3db353ea2a013da09938b2aa86" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "sales" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "price" numeric(10,2) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "userId" uuid, "customerId" uuid, CONSTRAINT "PK_4f0bc990ae81dba46da680895ea" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "procedures_perfomed" ADD CONSTRAINT "FK_a78004791d314b52b818d01321e" FOREIGN KEY ("procedureId") REFERENCES "procedure"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "procedures_perfomed" ADD CONSTRAINT "FK_bd7a8708b3d8fca3aded9a30451" FOREIGN KEY ("saleId") REFERENCES "sales"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products_sold" ADD CONSTRAINT "FK_dfc9aab2f2a484b8615d2ec858b" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products_sold" ADD CONSTRAINT "FK_19ece72dceed357de61d85f02aa" FOREIGN KEY ("saleId") REFERENCES "sales"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sales" ADD CONSTRAINT "FK_52ff6cd9431cc7687c76f935938" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sales" ADD CONSTRAINT "FK_3a92cf6add00043cef9833db1cd" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sales" DROP CONSTRAINT "FK_3a92cf6add00043cef9833db1cd"`);
        await queryRunner.query(`ALTER TABLE "sales" DROP CONSTRAINT "FK_52ff6cd9431cc7687c76f935938"`);
        await queryRunner.query(`ALTER TABLE "products_sold" DROP CONSTRAINT "FK_19ece72dceed357de61d85f02aa"`);
        await queryRunner.query(`ALTER TABLE "products_sold" DROP CONSTRAINT "FK_dfc9aab2f2a484b8615d2ec858b"`);
        await queryRunner.query(`ALTER TABLE "procedures_perfomed" DROP CONSTRAINT "FK_bd7a8708b3d8fca3aded9a30451"`);
        await queryRunner.query(`ALTER TABLE "procedures_perfomed" DROP CONSTRAINT "FK_a78004791d314b52b818d01321e"`);
        await queryRunner.query(`DROP TABLE "sales"`);
        await queryRunner.query(`DROP TABLE "products_sold"`);
        await queryRunner.query(`DROP TABLE "procedures_perfomed"`);
    }

}
