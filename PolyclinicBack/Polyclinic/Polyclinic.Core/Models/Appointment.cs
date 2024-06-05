
namespace Polyclinic.Core.Models
{
    public class Appointment
    {
        public Appointment(Guid id, DateTime dateTime, string patientTurnOut, string result, Guid patient_Id, Guid doctor_Id)
        {
            Id = id;
            DateTime = dateTime;
            PatientTurnOut = patientTurnOut;
            Result = result;
            Patient_Id = patient_Id;
            Doctor_Id = doctor_Id;
        }
        public Guid Id { get; }
        public DateTime DateTime { get; } = DateTime.MinValue;
        public string PatientTurnOut { get; } = string.Empty;
        public string Result { get; } = string.Empty;
        public Guid Patient_Id { get; }
        public string PatientSNP { get; set; } = string.Empty;
        public Guid Doctor_Id { get; }
        public string DoctorSNP { get; set; } = string.Empty;
    }
}
