using Polyclinic.Core.Models;

namespace Polyclinic.DataAccess.Repositories
{
    public interface IDoctorsRepository
    {
        Task<Guid> Create(Doctor doctor);
        Task<Guid> Delete(Guid id);
        Task<List<Doctor>> Get();
        Task<Guid> Update(Guid id, string surname, string name, string patronymic, string receptionHours, Guid region_Id, Guid department_Id);
    }
}