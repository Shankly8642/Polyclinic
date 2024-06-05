using Polyclinic.Core.Models;

namespace Polyclinic.DataAccess.Repositories
{
    public interface IDepartmentsRepository
    {
        Task<Guid> Create(Department department);
        Task<Guid> Delete(Guid id);
        Task<List<Department>> Get();
        Task<Guid> Update(Guid id, string title);
    }
}