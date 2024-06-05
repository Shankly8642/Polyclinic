using Polyclinic.Core.Models;

namespace Polyclinic.Application.Services
{
    public interface IDepartmentsService
    {
        Task<Guid> CreateDepartment(Department department);
        Task<Guid> DeleteDepartment(Guid id);
        Task<List<Department>> GetAllDepartments();
        Task<Guid> UpdateDepartment(Guid id, string title);
    }
}