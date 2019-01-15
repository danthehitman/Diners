using Microsoft.EntityFrameworkCore.Migrations;
using System;

namespace HL.Diners.Infrastructure.Migrations
{
    public partial class AddingEntriesToBuckets : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Used",
                table: "Bucket");

            migrationBuilder.CreateTable(
                name: "Entry",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    Created = table.Column<DateTime>(nullable: false),
                    Modified = table.Column<DateTime>(nullable: false),
                    Ammount = table.Column<int>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    Notes = table.Column<string>(nullable: true),
                    BucketId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Entry", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Entry_Bucket_BucketId",
                        column: x => x.BucketId,
                        principalTable: "Bucket",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Entry_BucketId",
                table: "Entry",
                column: "BucketId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Entry");

            migrationBuilder.AddColumn<int>(
                name: "Used",
                table: "Bucket",
                nullable: false,
                defaultValue: 0);
        }
    }
}
