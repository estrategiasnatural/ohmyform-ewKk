import { MigrationInterface, QueryRunner } from 'typeorm'

export class confirm1641132645227 implements MigrationInterface {
  name = 'confirm1641132645227'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `user` ADD `emailVerified` tinyint NOT NULL DEFAULT 0');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `user` DROP COLUMN `emailVerified`');
  }
}
