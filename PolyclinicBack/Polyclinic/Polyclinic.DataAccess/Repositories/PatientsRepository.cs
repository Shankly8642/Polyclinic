
using Microsoft.EntityFrameworkCore;
using Polyclinic.Core.Models;
using Polyclinic.DataAccess.Entites;

namespace Polyclinic.DataAccess.Repositories
{
    public class PatientsRepository : IPatientsRepository
    {
        private readonly PolyclinicDbContext context;

        public PatientsRepository(PolyclinicDbContext context)
        {
            this.context = context;
        }

        public async Task<List<Patient>> Get()
        {
            var patientsEntities = await context.Patients.
                AsNoTracking()
                .ToListAsync();

            var patients = patientsEntities.Select(p => new Patient(p.Id, p.Surname, p.Name, p.Patronymic, p.DateBirth, p.Region_Id)).ToList();
            foreach (var patient in patients)
            {
                var region = context.Regions.Where(r => r.Id == patient.Region_Id).Select(r => r.Title).SingleOrDefault();
                patient.TitleRegion = region;
            }
            return patients;

        }
        //public async Task<Patient> GetById(Guid id)
        //{
        //    var patientEntity = await context.Patients.FindAsync(id);
        //    var patient = new Patient(patientEntity.Id, patientEntity.Surname, patientEntity.Name, patientEntity.Patronymic, patientEntity.DateBirth, patientEntity.Region_Id);
        //    var region = context.Regions.Where(r => r.Id == patient.Region_Id).Select(r => r.Title).SingleOrDefault();
        //    patient.TitleRegion = region;
        //    return patient;

        //}

        public async Task<Guid> Create(Patient patient)
        {
            var patientEntity = new PatientEntity
            {
                Id = patient.Id,
                Surname = patient.Surname,
                Name = patient.Name,
                Patronymic = patient.Patronymic,
                DateBirth = patient.DateBirth,
                Region_Id = patient.Region_Id,
            };

            await context.Patients.AddAsync(patientEntity);
            await context.SaveChangesAsync();

            return patient.Id;
        }

        public async Task<Guid> Update(Guid id, string surname, string name, string patronymic, DateTime dateBirth, Guid region_Id)
        {
            await context.Patients.Where(p => p.Id == id).ExecuteUpdateAsync(p => p
            .SetProperty(b => b.Surname, b => surname)
            .SetProperty(b => b.Name, b => name)
            .SetProperty(b => b.Patronymic, b => patronymic)
            .SetProperty(b => b.DateBirth, b => dateBirth)
            .SetProperty(b => b.Region_Id, b => region_Id)
            );
            return id;
        }

        public async Task<Guid> Delete(Guid id)
        {
            await context.Patients
                .Where(p => p.Id == id)
                .ExecuteDeleteAsync();
            return id;
        }
    }
}
