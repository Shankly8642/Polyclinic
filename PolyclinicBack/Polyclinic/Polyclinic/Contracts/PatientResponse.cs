namespace Polyclinic.Contracts
{
    public record PatientResponse(
        Guid Id,
        string Surname,
        string Name,
        string Patronymic,
        DateTime DateBirth,
        Guid Region_Id,
        string TitleRegion);
}
