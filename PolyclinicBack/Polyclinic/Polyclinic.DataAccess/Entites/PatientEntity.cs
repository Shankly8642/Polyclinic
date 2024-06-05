

namespace Polyclinic.DataAccess.Entites
{
    public class PatientEntity
    {
        public Guid Id { get; set; }
        public string Surname { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string Patronymic { get; set; } = string.Empty;
        public DateTime DateBirth { get; set; } = DateTime.MinValue;
        public Guid Region_Id { get; set; }
    }
}
