using Microsoft.EntityFrameworkCore.Migrations;
using NetTopologySuite.Geometries;

namespace HL.Diners.Infrastructure.Migrations
{
    public partial class AddLocatioToEntry : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Location",
                table: "Entry",
                nullable: true);

            migrationBuilder.AddColumn<Point>(
                name: "LocationPoint",
                table: "Entry",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Location",
                table: "Entry");

            migrationBuilder.DropColumn(
                name: "LocationPoint",
                table: "Entry");
        }
    }
}
