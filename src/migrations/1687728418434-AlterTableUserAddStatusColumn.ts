import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AlterTableUserAddStatusColumn1687728418434
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "users",
      new TableColumn({
        name: "status",
        type: "enum",
        enum: ["pending verification", "active", "inactive"],
        default: "'pending verification'",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("users", "status")
  }  
}
