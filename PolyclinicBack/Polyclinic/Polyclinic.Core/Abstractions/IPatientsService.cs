using Polyclinic.Core.Models;

namespace Polyclinic.Application.Services
{
    public interface IPatientsService
    {
        Task<Guid> CreatePatient(Patient patient);
        Task<Guid> DeletePatient(Guid id);
        Task<List<Patient>> GetAllPatients();
        Task<Guid> UpdatePatient(Guid id, string surname, string name, string patronymic, DateTime dateBirth, Guid region_Id);
    }
}