using HL.Diners.Model;
using Microsoft.EntityFrameworkCore;

namespace HL.Diners.Data
{
    public class DinersContext : DbContext
    {
        public DbSet<Cycle> Cycles { get; set; }

        public DinersContext(DbContextOptions<DinersContext> options) : base(options) { }

        //protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        //{
        //    optionsBuilder.UseNpgsql($"Server=127.0.0.1;Port=5432;Database=diners;User Id=diners;Password=d1N3r5Pg4dmin; Persist Security Info=True;");
        //}
    }
}
