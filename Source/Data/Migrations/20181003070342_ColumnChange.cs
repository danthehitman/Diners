using Microsoft.EntityFrameworkCore.Migrations;

namespace HL.Diners.Infrastructure.Migrations
{
    public partial class ColumnChange : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Current",
                table: "Bucket",
                newName: "Used");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Used",
                table: "Bucket",
                newName: "Current");
        }
    }
}
