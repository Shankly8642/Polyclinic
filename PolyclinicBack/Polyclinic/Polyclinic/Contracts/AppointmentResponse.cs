namespace Polyclinic.Contracts
{
    public record AppointmentResponse(
        Guid Id,
        DateTime DateTime,
        string PatientTurnOut,
        string Result,
        Guid Patient_Id,
        string PatientSNP,
        Guid Doctor_Id,
        string DoctorSNP);
}
