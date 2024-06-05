using Polyclinic.Core.Models;

namespace Polyclinic.Application.Services
{
    public interface IDoctorsService
    {
        Task<Guid> CreateDoctor(Doctor doctor);
        Task<Guid> DeleteDoctor(Guid id);
        Task<List<Doctor>> GetAllDoctors();
        Task<Guid> UpdateDoctor(Guid id, string surname, string name, string patronymic, string receptionHours, Guid region_Id, Guid department_Id);
    }
}