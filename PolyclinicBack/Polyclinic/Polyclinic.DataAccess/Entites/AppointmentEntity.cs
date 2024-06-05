
namespace Polyclinic.DataAccess.Entites
{
    public class AppointmentEntity
    {
        public Guid Id { get; set; }
        public DateTime DateTime { get; set; } = DateTime.MinValue;
        public string PatientTurnOut { get; set; } = string.Empty;
        public string Result { get; set; } = string.Empty;
        public Guid Patient_Id { get; set; }
        public Guid Doctor_Id { get; set; }
    }
}

