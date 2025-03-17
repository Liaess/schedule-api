import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeDefaultIsActive1739113547726 implements MigrationInterface {
  name = 'ChangeDefaultIsActive1739113547726';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "isActive" SET DEFAULT false`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "isActive" SET DEFAULT true`,
    );
  }
}
