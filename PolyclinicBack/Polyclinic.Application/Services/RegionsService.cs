using Polyclinic.Core.Models;
using Polyclinic.DataAccess.Repositories;

namespace Polyclinic.Application.Services
{
    public class RegionsService : IRegionsService
    {
        private readonly IRegionsRepository regionsRepository;

        public RegionsService(IRegionsRepository regionsRepository)
        {
            this.regionsRepository = regionsRepository;
        }

        public async Task<List<Region>> GetAllRegions()
        {
            return await regionsRepository.Get();
        }

        public async Task<Guid> CreateRegion(Region region)
        {
            return await regionsRepository.Create(region);
        }

        public async Task<Guid> UpdateRegion(Guid id, string title)
        {
            return await regionsRepository.Update(id, title);
        }

        public async Task<Guid> DeleteRegion(Guid id)
        {
            return await regionsRepository.Delete(id);
        }
    }
}
