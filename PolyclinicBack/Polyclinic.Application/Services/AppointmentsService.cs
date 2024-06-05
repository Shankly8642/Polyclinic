using Polyclinic.Core.Models;
using Polyclinic.DataAccess.Repositories;

namespace Polyclinic.Application.Services
{
    public class AppointmentsService : IAppointmentsService
    {
        private readonly IAppointmentsRepository appointmentsRepository;

        public AppointmentsService(IAppointmentsRepository appointmentsRepository)
        {
            this.appointmentsRepository = appointmentsRepository;
        }

        public async Task<List<Appointment>> GetAllAppointments()
        {
            return await appointmentsRepository.Get();
        }

        public async Task<Guid> CreateAppointment(Appointment appointment)
        {
            return await appointmentsRepository.Create(appointment);
        }

        public async Task<Guid> UpdateAppointment(Guid id, DateTime dateTime, string patientTurnOut, string result, Guid patient_Id, Guid doctor_Id)
        {
            return await appointmentsRepository.Update(id, dateTime, patientTurnOut, result, patient_Id, doctor_Id);
        }

        public async Task<Guid> DeleteAppointment(Guid id)
        {
            return await appointmentsRepository.Delete(id);
        }
    }
}
