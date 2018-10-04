using HL.Diners.Core.Exceptions;
using HL.Diners.Core.Model;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HL.Diners.Infrastructure.EfData
{
    public class EfDinersRepository : Core.Data.IDinersRepository
    {
        private readonly DinersContext _context;

        public EfDinersRepository(DinersContext context)
        {
            _context = context;
        }

        public async Task<Cycle> AddCycleAsync(Cycle cycle)
        {
            _context.Cycles.Add(cycle);
            await _context.SaveChangesAsync();
            return cycle;
        }

        public IEnumerable<Cycle> GetCycles()
        {
            return _context.Cycles;
        }

        public async Task<Cycle> GetCycleAsync(string id)
        {
            return await _context.Cycles.FindAsync(id);
        }

        public async Task<Cycle> UpdateCycleAsync(Cycle cycle)
        {
            _context.Entry(cycle).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CycleExists(cycle.Id))
                {
                    throw new DinersNotFoundException();
                }
                else
                {
                    throw;
                }
            }

            return cycle;
        }

        public async Task RemoveCycleAsync(string id)
        {
            var cycle = await _context.Cycles.FindAsync(id);
            if (cycle == null)
            {
                throw new DinersNotFoundException();
            }

            _context.Cycles.Remove(cycle);
            await _context.SaveChangesAsync();
        }

        public bool CycleExists(string id)
        {
            return GetCycles().Any(e => e.Id == id);
        }
    }
}
