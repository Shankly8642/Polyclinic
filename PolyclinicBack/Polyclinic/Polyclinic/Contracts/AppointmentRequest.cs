namespace Polyclinic.Contracts
{
    public record AppointmentRequest(
        DateTime DateTime,
        string PatientTurnOut,
        string Result,
        Guid Patient_Id,
        Guid Doctor_Id);
}
