
namespace Polyclinic.DataAccess.Entites
{
    public class DoctorEntity
    {
        public Guid Id { get; set; }
        public string Surname { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string Patronymic { get; set; } = string.Empty;
        public string ReceptionHours { get; set; } = string.Empty;
        public Guid Region_Id { get; set; }
        public Guid Department_Id { get; set; }

    }
}
