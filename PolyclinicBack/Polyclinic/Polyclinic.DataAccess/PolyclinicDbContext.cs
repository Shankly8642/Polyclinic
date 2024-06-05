using Microsoft.EntityFrameworkCore;
using Polyclinic.DataAccess.Entites;

namespace Polyclinic.DataAccess
{
    public class PolyclinicDbContext : DbContext
    {
        public PolyclinicDbContext(DbContextOptions<PolyclinicDbContext> options)
            : base(options)
        {     
        }
        public DbSet<DepartmentEntity> Departments { get; set; }
        public DbSet<RegionEntity> Regions { get; set; }
        public DbSet<PatientEntity> Patients { get; set; }
        public DbSet<DoctorEntity> Doctors { get; set; }
        public DbSet<AppointmentEntity> Appointments { get; set; }
        public DbSet<UserEntity> Users { get; set; }
    }
}
