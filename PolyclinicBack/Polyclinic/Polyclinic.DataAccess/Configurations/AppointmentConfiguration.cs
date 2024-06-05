
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Polyclinic.DataAccess.Entites;

namespace Polyclinic.DataAccess.Configurations
{
    public class AppointmentConfiguration
    {
        public void Configure(EntityTypeBuilder<AppointmentEntity> builder)
        {
            builder.HasKey(a => a.Id);
            builder.Property(b => b.DateTime).IsRequired();
            builder.Property(b => b.PatientTurnOut).IsRequired();
            builder.Property(b => b.Result).IsRequired();
            builder.Property(b => b.Patient_Id).IsRequired();
            builder.Property(b => b.Doctor_Id).IsRequired();
        }
    }
}
