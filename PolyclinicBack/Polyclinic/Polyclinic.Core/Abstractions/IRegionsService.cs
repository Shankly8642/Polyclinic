using Polyclinic.Core.Models;

namespace Polyclinic.Application.Services
{
    public interface IRegionsService
    {
        Task<Guid> CreateRegion(Region region);
        Task<Guid> DeleteRegion(Guid id);
        Task<List<Region>> GetAllRegions();
        Task<Guid> UpdateRegion(Guid id, string title);
    }
}