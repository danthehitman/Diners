using HL.Diners.Core.Model;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace HL.Diners.Infrastructure.EfData
{
    public class DinersContext : DbContext
    {
        public DbSet<Cycle> Cycles { get; set; }

        public DinersContext(DbContextOptions<DinersContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Cycle>()
             .Property(c => c.ExtendedData)
             .HasConversion(
                 v => JsonConvert.SerializeObject(v),
                 v => JsonConvert.DeserializeObject<JObject>(v));
        }
    }
}
