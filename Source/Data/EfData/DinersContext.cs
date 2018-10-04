using HL.Diners.Core.Model;
using Microsoft.EntityFrameworkCore;

namespace HL.Diners.Infrastructure.EfData
{
    public class DinersContext : DbContext
    {
        public DbSet<Cycle> Cycles { get; set; }

        public DinersContext(DbContextOptions<DinersContext> options) : base(options) { }
    }
}
