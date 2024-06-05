using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Polyclinic.DataAccess.Entites;

namespace Polyclinic.DataAccess.Configurations
{
    public class RegionConfiguration : IEntityTypeConfiguration<RegionEntity>
    {
        public void Configure(EntityTypeBuilder<RegionEntity> builder) 
        {
            builder.HasKey(r => r.Id);

            builder.Property(r => r.Title).IsRequired();
        }
    }
}
