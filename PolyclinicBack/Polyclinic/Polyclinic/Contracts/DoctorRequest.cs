namespace Polyclinic.Contracts
{
    public record DoctorRequest(
        string Surname,
        string Name,
        string Patronymic,
        string ReceptionHours,
        Guid Region_Id,
        Guid Department_Id);
}
