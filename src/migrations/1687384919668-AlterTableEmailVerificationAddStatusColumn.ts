import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AlterTableEmailVerificationAddStatusColumn1687384919668
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "email_verifications",
      new TableColumn({
        name: "status",
        type: "enum",
        enum: ["expired", "active"],
        isNullable: true
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("email_verifications", "status");
  }
}
