
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Polyclinic.DataAccess.Entites;

namespace Polyclinic.DataAccess.Configurations
{
    public class DoctorConfiguration
    {
        public void Configure(EntityTypeBuilder<DoctorEntity> builder)
        {
            builder.HasKey(d => d.Id);
            builder.Property(b => b.Surname).IsRequired();
            builder.Property(b => b.Name).IsRequired();
            builder.Property(b => b.Patronymic).IsRequired();
            builder.Property(b => b.ReceptionHours).IsRequired();
            builder.Property(b => b.Region_Id).IsRequired();
            builder.Property(b => b.Department_Id).IsRequired();
        }
    }
}
