using Polyclinic.Core.Models;
using Polyclinic.DataAccess.Repositories;

namespace Polyclinic.Application.Services
{
    public class PatientsService : IPatientsService
    {
        private readonly IPatientsRepository patientsRepository;

        public PatientsService(IPatientsRepository patientsRepository)
        {
            this.patientsRepository = patientsRepository;
        }

        public async Task<List<Patient>> GetAllPatients()
        {
            return await patientsRepository.Get();
        }

        public async Task<Guid> CreatePatient(Patient patient)
        {
            return await patientsRepository.Create(patient);
        }

        public async Task<Guid> UpdatePatient(Guid id, string surname, string name, string patronymic, DateTime dateBirth, Guid region_Id)
        {
            return await patientsRepository.Update(id, surname, name, patronymic, dateBirth, region_Id);
        }

        public async Task<Guid> DeletePatient(Guid id)
        {
            return await patientsRepository.Delete(id);
        }
    }
}
