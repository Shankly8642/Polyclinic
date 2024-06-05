
using Microsoft.EntityFrameworkCore;
using Polyclinic.Core.Models;
using Polyclinic.DataAccess.Entites;

namespace Polyclinic.DataAccess.Repositories
{
    public class DepartmentsRepository : IDepartmentsRepository
    {
        private readonly PolyclinicDbContext context;

        public DepartmentsRepository(PolyclinicDbContext context)
        {
            this.context = context;
        }

        public async Task<List<Department>> Get()
        {
            var departmentsEntities = await context.Departments.
                AsNoTracking()
                .ToListAsync();

            var departments = departmentsEntities.Select(d => Department.Create(d.Id, d.Title).department).ToList();
            return departments;

        }

        public async Task<Department> GetById(Guid id)
        {
            var departmentEntity = await context.Departments.FindAsync(id);
            var department = Department.Create(departmentEntity.Id,
                                           departmentEntity.Title).department;
            return department;
        }

        public async Task<Guid> Create(Department department)
        {
            var departmentEntity = new DepartmentEntity
            {
                Id = department.Id,
                Title = department.Title,
            };

            await context.Departments.AddAsync(departmentEntity);
            await context.SaveChangesAsync();

            return departmentEntity.Id;
        }

        public async Task<Guid> Update(Guid id, string title)
        {
            await context.Departments
                .Where(d => d.Id == id)
                .ExecuteUpdateAsync(s => s.SetProperty(d => d.Title, d => title));
            return id;
        }

        public async Task<Guid> Delete(Guid id)
        {
            await context.Departments
                .Where(d => d.Id == id)
                .ExecuteDeleteAsync();
            return id;
        }
    }
}
