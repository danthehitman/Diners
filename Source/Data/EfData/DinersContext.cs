using HL.Diners.Core.Model;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace HL.Diners.Infrastructure.EfData
{
    public class DinersContext : DbContext
    {
        public DbSet<Cycle> Cycles { get; set; }
        public DbSet<Bucket> Buckets { get; set; }
        public DbSet<Entry> Entries { get; set; }

        public DinersContext(DbContextOptions<DinersContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Cycle>()
                .ToTable("Cycle")
                .Property(c => c.ExtendedData)
                .HasConversion(
                    v => JsonConvert.SerializeObject(v),
                    v => JsonConvert.DeserializeObject<JObject>(v));

            modelBuilder.Entity<Bucket>()
               .ToTable("Bucket");

            modelBuilder.Entity<Entry>()
               .ToTable("Entry");
        }
    }
}
