using Microsoft.EntityFrameworkCore.Migrations;

namespace HL.Diners.Infrastructure.Migrations
{
    public partial class _104182 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "DataString",
                table: "Cycles",
                newName: "Data");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Data",
                table: "Cycles",
                newName: "DataString");
        }
    }
}
