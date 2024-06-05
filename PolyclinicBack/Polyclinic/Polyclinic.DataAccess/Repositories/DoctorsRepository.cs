using Microsoft.EntityFrameworkCore;
using Polyclinic.Core.Models;
using Polyclinic.DataAccess.Entites;

namespace Polyclinic.DataAccess.Repositories
{
    public class DoctorsRepository : IDoctorsRepository
    {
        private readonly PolyclinicDbContext context;

        public DoctorsRepository(PolyclinicDbContext context)
        {
            this.context = context;
        }

        public async Task<List<Doctor>> Get()
        {
            var doctorsEntities = await context.Doctors.
                AsNoTracking()
                .ToListAsync();

            var doctors = doctorsEntities.Select(d => new Doctor(d.Id, d.Surname, d.Name, d.Patronymic, d.ReceptionHours, d.Region_Id, d.Department_Id)).ToList();
            foreach (var doctor in doctors)
            {
                var region = context.Regions.Where(r => r.Id == doctor.Region_Id).Select(r => r.Title).SingleOrDefault();
                doctor.TitleRegion = region;

                var department = context.Departments.Where(d => d.Id == doctor.Department_Id).Select(d => d.Title).SingleOrDefault();
                doctor.TitleDepartment = department;
            }
            return doctors;

        }
        //public async Task<Doctor> GetById(Guid id)
        //{
        //    var doctorEntity = await context.Doctors.FindAsync(id);
        //    var doctor = new Doctor(doctorEntity.Id, doctorEntity.Surname, doctorEntity.Name, doctorEntity.Patronymic, doctorEntity.ReceptionHours, doctorEntity.Region_Id, doctorEntity.Department_Id);

        //    var region = context.Regions.Where(r => r.Id == doctor.Region_Id).Select(r => r.Title).SingleOrDefault();
        //    doctor.TitleRegion = region;

        //    var department = context.Departments.Where(d => d.Id == doctor.Department_Id).Select(d => d.Title).SingleOrDefault();
        //    doctor.TitleDepartment = department;

        //    return doctor;

        //}

        public async Task<Guid> Create(Doctor doctor)
        {
            var doctorEntity = new DoctorEntity
            {
                Id = doctor.Id,
                Surname = doctor.Surname,
                Name = doctor.Name,
                Patronymic = doctor.Patronymic,
                ReceptionHours = doctor.ReceptionHours,
                Region_Id = doctor.Region_Id,
                Department_Id = doctor.Department_Id
            };

            await context.Doctors.AddAsync(doctorEntity);
            await context.SaveChangesAsync();

            return doctor.Id;
        }

        public async Task<Guid> Update(Guid id, string surname, string name, string patronymic, string receptionHours, Guid region_Id, Guid department_Id)
        {
            await context.Doctors.Where(d => d.Id == id).ExecuteUpdateAsync(d => d
            .SetProperty(b => b.Surname, b => surname)
            .SetProperty(b => b.Name, b => name)
            .SetProperty(b => b.Patronymic, b => patronymic)
            .SetProperty(b => b.ReceptionHours, b => receptionHours)
            .SetProperty(b => b.Region_Id, b => region_Id)
            .SetProperty(b => b.Department_Id, b => department_Id)
            );
            return id;
        }

        public async Task<Guid> Delete(Guid id)
        {
            await context.Doctors
                .Where(p => p.Id == id)
                .ExecuteDeleteAsync();
            return id;
        }
    }
}
