using Polyclinic.Core.Models;

namespace Polyclinic.Application.Services
{
    public interface IAppointmentsService
    {
        Task<Guid> CreateAppointment(Appointment appointment);
        Task<Guid> DeleteAppointment(Guid id);
        Task<List<Appointment>> GetAllAppointments();
        Task<Guid> UpdateAppointment(Guid id, DateTime dateTime, string patientTurnOut, string result, Guid patient_Id, Guid doctor_Id);
    }
}