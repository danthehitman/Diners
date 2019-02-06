using HL.Diners.Core.Exceptions;
using HL.Diners.Core.Model;
using Microsoft.EntityFrameworkCore;
using System;
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

        public async Task<IEnumerable<Cycle>> GetCyclesAsync()
        {
            return await _context.Cycles.Include(cycle => cycle.Buckets).ThenInclude(bucket => bucket.Entries).ToListAsync();
        }

        public async Task<Cycle> GetCycleAsync(string id)
        {
            return await _context.Cycles.Include(cycle => cycle.Buckets).ThenInclude(bucket => bucket.Entries)
                .FirstOrDefaultAsync(cycle => cycle.Id == id);
        }

        public async Task<Bucket> GetBucketAsync(string id)
        {
            return await _context.Buckets.Include(bucket => bucket.Entries)
                .FirstOrDefaultAsync(bucket => bucket.Id == id);
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
            var cycle = await _context.Cycles.Include(c => c.Buckets).ThenInclude(b => b.Entries).FirstOrDefaultAsync(c => c.Id == id);
            if (cycle == null)
            {
                throw new DinersNotFoundException();
            }

            _context.Cycles.Remove(cycle);
            await _context.SaveChangesAsync();
        }

        public bool CycleExists(string id)
        {
            return GetCyclesAsync().Result.Any(e => e.Id == id);
        }

        public async Task<Cycle> GetActiveCycleByUserAsync(string userId)
        {
            return await _context.Cycles.Include(cycle => cycle.Buckets).ThenInclude(bucket => bucket.Entries)
                .FirstOrDefaultAsync(c => c.StartDate <= DateTime.Now && c.EndDate >= DateTime.Now);
        }

        public async Task<Entry> AddEntryAsync(Entry entry, string bucketId)
        {
            Bucket bucket = await GetBucketAsync(bucketId);
            if (bucket == null)
            {
                throw new DinersNotFoundException();
            }
            bucket.Entries.Add(entry);
            await _context.SaveChangesAsync();
            return entry;
        }

        public async Task RemoveEntryAsync(string id)
        {
            var entry = await _context.Entries.FirstOrDefaultAsync(c => c.Id == id);
            if (entry == null)
            {
                throw new DinersNotFoundException();
            }

            _context.Entries.Remove(entry);
            await _context.SaveChangesAsync();
        }

        public async Task<Bucket> AddBucketAsync(Bucket bucket, string cycleId)
        {
            Cycle cycle = await GetCycleAsync(cycleId);
            if (cycle == null)
            {
                throw new DinersNotFoundException();
            }
            cycle.Buckets.Add(bucket);
            await _context.SaveChangesAsync();
            return bucket;
        }
    }
}
