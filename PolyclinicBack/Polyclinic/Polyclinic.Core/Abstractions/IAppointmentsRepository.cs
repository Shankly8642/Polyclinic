using Polyclinic.Core.Models;

namespace Polyclinic.DataAccess.Repositories
{
    public interface IAppointmentsRepository
    {
        Task<Guid> Create(Appointment appointment);
        Task<Guid> Delete(Guid id);
        Task<List<Appointment>> Get();
        Task<Guid> Update(Guid id, DateTime dateTime, string patientTurnOut, string result, Guid patient_Id, Guid doctor_Id);
    }
}