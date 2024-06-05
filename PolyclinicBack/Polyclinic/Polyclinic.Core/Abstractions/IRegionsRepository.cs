using Polyclinic.Core.Models;

namespace Polyclinic.DataAccess.Repositories
{
    public interface IRegionsRepository
    {
        Task<Guid> Create(Region region);
        Task<Guid> Delete(Guid id);
        Task<List<Region>> Get();
        Task<Guid> Update(Guid id, string title);
    }
}