
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Polyclinic.DataAccess.Entites;

namespace Polyclinic.DataAccess.Configurations
{
    public class PatientConfiguration
    {
        public void Configure(EntityTypeBuilder<PatientEntity> builder)
        {
            builder.HasKey(p => p.Id);
            builder.Property(b => b.Surname).IsRequired();
            builder.Property(b => b.Name).IsRequired();
            builder.Property(b => b.Patronymic).IsRequired();
            builder.Property(b => b.DateBirth).IsRequired();
            builder.Property(b => b.Region_Id).IsRequired();
        }
    }
}
