
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Polyclinic.DataAccess.Entites;

namespace Polyclinic.DataAccess.Configurations
{
    public class UserConfiguration
    {
        public void Configure(EntityTypeBuilder<UserEntity> builder)
        {
            builder.HasKey(u => u.Id);
            builder.Property(b => b.Login).IsRequired();
            builder.Property(b => b.Password).IsRequired();
            builder.Property(b => b.Surname);
            builder.Property(b => b.Name);
            builder.Property(b => b.Patronymic);
            builder.Property(b => b.Email);
        }
    }
}
