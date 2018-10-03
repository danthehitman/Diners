﻿// <auto-generated />
using System;
using HL.Diners.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace HL.Diners.Data.Migrations
{
    [DbContext(typeof(DinersContext))]
    [Migration("20181003070342_ColumnChange")]
    partial class ColumnChange
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn)
                .HasAnnotation("ProductVersion", "2.1.4-rtm-31024")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            modelBuilder.Entity("HL.Diners.Model.Bucket", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("CycleId");

                    b.Property<string>("Name");

                    b.Property<int>("Target");

                    b.Property<int>("Used");

                    b.HasKey("Id");

                    b.HasIndex("CycleId");

                    b.ToTable("Bucket");
                });

            modelBuilder.Entity("HL.Diners.Model.Cycle", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("EndDate");

                    b.Property<double>("Income");

                    b.Property<double>("SavingsTarget");

                    b.Property<DateTime>("StartDate");

                    b.HasKey("Id");

                    b.ToTable("Cycles");
                });

            modelBuilder.Entity("HL.Diners.Model.Bucket", b =>
                {
                    b.HasOne("HL.Diners.Model.Cycle")
                        .WithMany("Planned")
                        .HasForeignKey("CycleId");
                });
#pragma warning restore 612, 618
        }
    }
}
