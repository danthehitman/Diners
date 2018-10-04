using Microsoft.EntityFrameworkCore.Migrations;

namespace HL.Diners.Infrastructure.Migrations
{
    public partial class _104183 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Data",
                table: "Cycles");

            migrationBuilder.AddColumn<string>(
                name: "ExtendedData",
                table: "Cycles",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ExtendedData",
                table: "Cycles");

            migrationBuilder.AddColumn<string>(
                name: "Data",
                table: "Cycles",
                nullable: true);
        }
    }
}
