import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeIsActiveColumnName1739127365961
  implements MigrationInterface
{
  name = 'ChangeIsActiveColumnName1739127365961';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" RENAME COLUMN "isActive" TO "is_active"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" RENAME COLUMN "is_active" TO "isActive"`,
    );
  }
}
