using Microsoft.EntityFrameworkCore;
using Polyclinic.Core.Models;
using Polyclinic.DataAccess.Entites;

namespace Polyclinic.DataAccess.Repositories
{
    public class RegionsRepository : IRegionsRepository
    {
        private readonly PolyclinicDbContext context;

        public RegionsRepository(PolyclinicDbContext context)
        {
            this.context = context;
        }

        public async Task<List<Region>> Get()
        {
            var regionsEntities = await context.Regions.
                AsNoTracking()
                .ToListAsync();

            var regions = regionsEntities.Select(r => Region.Create(r.Id, r.Title).region).ToList();
            return regions;
        }

        public async Task<Region> GetById(Guid id)
        {
            var regionEntity = await context.Regions.FindAsync(id);
            var region = Region.Create(regionEntity.Id,
                                           regionEntity.Title).region;
            return region;
        }

        public async Task<Guid> Create(Region region)
        {
            var regionEntity = new RegionEntity
            {
                Id = region.Id,
                Title = region.Title,
            };

            await context.Regions.AddAsync(regionEntity);
            await context.SaveChangesAsync();

            return regionEntity.Id;
        }

        public async Task<Guid> Update(Guid id, string title)
        {
            await context.Regions
                .Where(r => r.Id == id)
                .ExecuteUpdateAsync(s => s.SetProperty(r => r.Title, r => title));
            return id;
        }

        public async Task<Guid> Delete(Guid id)
        {
            await context.Regions
                .Where(r => r.Id == id)
                .ExecuteDeleteAsync();
            return id;
        }
    }
}
