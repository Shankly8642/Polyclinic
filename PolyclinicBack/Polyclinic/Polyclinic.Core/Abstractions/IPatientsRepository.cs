using Polyclinic.Core.Models;

namespace Polyclinic.DataAccess.Repositories
{
    public interface IPatientsRepository
    {
        Task<Guid> Create(Patient patient);
        Task<Guid> Delete(Guid id);
        Task<List<Patient>> Get();
        Task<Guid> Update(Guid id, string surname, string name, string patronymic, DateTime dateBirth, Guid region_Id);
    }
}