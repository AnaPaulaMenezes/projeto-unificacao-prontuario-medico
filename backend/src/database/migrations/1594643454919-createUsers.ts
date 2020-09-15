import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class createUsers1594643454919 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'uniqueidentifier',
            isGenerated: true,
            generationStrategy: 'uuid',
            isPrimary: true,
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'cpf',
            type: 'char(12)',
          },
          {
            name: 'rg',
            type: 'char(12)',
          },
          {
            name: 'password',
            type: 'varchar',
          },
          {
            name: 'born',
            type: 'timestamp',
            isNullable: true
          },
          {
            name: 'created_at',
            type: 'datetime',
            default: 'getDate()',
          },
          {
            name: 'updated_at',
            type: 'datetime',
            default: 'getDate()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}
