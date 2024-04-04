import { MigrationInterface, QueryRunner } from "typeorm";

export class PriceCents1712264179698 implements MigrationInterface {
    name = 'PriceCents1712264179698'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "procedure" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "procedure" ADD "price" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "procedures_perfomed" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "procedures_perfomed" ADD "price" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "price" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products_sold" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "products_sold" ADD "price" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products_sold" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "products_sold" ADD "price" numeric(10,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "price" numeric(10,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "procedures_perfomed" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "procedures_perfomed" ADD "price" numeric(10,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "procedure" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "procedure" ADD "price" numeric(10,2) NOT NULL`);
    }

}
