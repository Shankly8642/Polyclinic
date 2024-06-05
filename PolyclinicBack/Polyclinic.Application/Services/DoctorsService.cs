using Polyclinic.Core.Models;
using Polyclinic.DataAccess.Repositories;

namespace Polyclinic.Application.Services
{
    public class DoctorsService : IDoctorsService
    {
        private readonly IDoctorsRepository doctorsRepository;

        public DoctorsService(IDoctorsRepository doctorsRepository)
        {
            this.doctorsRepository = doctorsRepository;
        }

        public async Task<List<Doctor>> GetAllDoctors()
        {
            return await doctorsRepository.Get();
        }

        public async Task<Guid> CreateDoctor(Doctor doctor)
        {
            return await doctorsRepository.Create(doctor);
        }

        public async Task<Guid> UpdateDoctor(Guid id, string surname, string name, string patronymic, string receptionHours, Guid region_Id, Guid department_Id)
        {
            return await doctorsRepository.Update(id, surname, name, patronymic, receptionHours, region_Id, department_Id);
        }

        public async Task<Guid> DeleteDoctor(Guid id)
        {
            return await doctorsRepository.Delete(id);
        }
    }
}
