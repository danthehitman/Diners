using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace HL.Diners.Infrastructure.Migrations
{
    public partial class _104181 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Income",
                table: "Cycles",
                newName: "Budget");

            migrationBuilder.AddColumn<DateTime>(
                name: "Created",
                table: "Cycles",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "DataString",
                table: "Cycles",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "Modified",
                table: "Cycles",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "Created",
                table: "Bucket",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "Modified",
                table: "Bucket",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Created",
                table: "Cycles");

            migrationBuilder.DropColumn(
                name: "DataString",
                table: "Cycles");

            migrationBuilder.DropColumn(
                name: "Modified",
                table: "Cycles");

            migrationBuilder.DropColumn(
                name: "Created",
                table: "Bucket");

            migrationBuilder.DropColumn(
                name: "Modified",
                table: "Bucket");

            migrationBuilder.RenameColumn(
                name: "Budget",
                table: "Cycles",
                newName: "Income");
        }
    }
}
