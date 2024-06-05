using Polyclinic.Core.Models;
using Polyclinic.DataAccess.Repositories;

namespace Polyclinic.Application.Services
{
    public class DepartmentsService : IDepartmentsService
    {
        private readonly IDepartmentsRepository departmentsRepository;

        public DepartmentsService(IDepartmentsRepository departmentsRepository)
        {
            this.departmentsRepository = departmentsRepository;
        }

        public async Task<List<Department>> GetAllDepartments()
        {
            return await departmentsRepository.Get();
        }

        public async Task<Guid> CreateDepartment(Department department)
        {
            return await departmentsRepository.Create(department);
        }

        public async Task<Guid> UpdateDepartment(Guid id, string title)
        {
            return await departmentsRepository.Update(id, title);
        }

        public async Task<Guid> DeleteDepartment(Guid id)
        {
            return await departmentsRepository.Delete(id);
        }
    }
}
