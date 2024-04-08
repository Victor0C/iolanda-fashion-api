import { MigrationInterface, QueryRunner } from "typeorm";

export class ColumUserLoginUsers1712521163582 implements MigrationInterface {
    name = 'ColumUserLoginUsers1712521163582'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "user_Login" character varying(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "user_Login"`);
    }

}
