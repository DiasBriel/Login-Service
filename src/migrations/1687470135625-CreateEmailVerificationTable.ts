import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateEmailVerificationTable1687470135625
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "email_verifications",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            default: "uuid_generate_v4()",
          },
          {
            name: "email",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "token",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "expiresAt",
            type: "timestamp",
            isNullable: false,
          },
          {
            name: "createdAt",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "status",
            type: "enum",
            enum: ["expired", "active"],
            default: "'active'",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("email_verifications");
  }
}
