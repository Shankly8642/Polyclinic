using Microsoft.EntityFrameworkCore;
using Polyclinic.Core.Models;
using Polyclinic.DataAccess.Entites;

namespace Polyclinic.DataAccess.Repositories
{
    public class AppointmentsRepository : IAppointmentsRepository
    {
        private readonly PolyclinicDbContext context;

        public AppointmentsRepository(PolyclinicDbContext context)
        {
            this.context = context;
        }

        public async Task<List<Appointment>> Get()
        {
            var appointmentsEntities = await context.Appointments.
                AsNoTracking()
                .ToListAsync();

            var appointments = appointmentsEntities.Select(a => new Appointment(a.Id, a.DateTime, a.PatientTurnOut, a.Result, a.Patient_Id, a.Doctor_Id)).ToList();
            foreach (var appointment in appointments)
            {
                var patient = context.Patients.Where(r => r.Id == appointment.Patient_Id).Select(p => $"{p.Surname} {p.Name} {p.Patronymic}").SingleOrDefault();
                appointment.PatientSNP = patient;

                var doctor = context.Doctors.Where(d => d.Id == appointment.Doctor_Id).Select(d => $"{d.Surname} {d.Name} {d.Patronymic}").SingleOrDefault();
                appointment.DoctorSNP = doctor;
            }
            return appointments;

        }

        public async Task<Guid> Create(Appointment appointment)
        {
            var appointmentEntity = new AppointmentEntity
            {
                Id = appointment.Id,
                DateTime = appointment.DateTime,
                PatientTurnOut = appointment.PatientTurnOut,
                Result = appointment.Result,
                Patient_Id = appointment.Patient_Id,
                Doctor_Id = appointment.Doctor_Id
            };

            await context.Appointments.AddAsync(appointmentEntity);
            await context.SaveChangesAsync();

            return appointment.Id;
        }

        public async Task<Guid> Update(Guid id, DateTime dateTime, string patientTurnOut, string result, Guid patient_Id, Guid doctor_Id)
        {
            await context.Appointments.Where(a => a.Id == id).ExecuteUpdateAsync(a => a
            .SetProperty(b => b.DateTime, b => dateTime)
            .SetProperty(b => b.PatientTurnOut, b => patientTurnOut)
            .SetProperty(b => b.Result, b => result)
            .SetProperty(b => b.Patient_Id, b => patient_Id)
            .SetProperty(b => b.Doctor_Id, b => doctor_Id)
            );
            return id;
        }

        public async Task<Guid> Delete(Guid id)
        {
            await context.Appointments
                .Where(a => a.Id == id)
                .ExecuteDeleteAsync();
            return id;
        }
    }
}
