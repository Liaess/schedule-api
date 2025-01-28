import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddActivationCodeUsersTable1738016332252
  implements MigrationInterface
{
  name = 'AddActivationCodeUsersTable1738016332252';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD "activation_code" uuid NOT NULL DEFAULT uuid_generate_v4()`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" DROP COLUMN "activation_code"`,
    );
  }
}
