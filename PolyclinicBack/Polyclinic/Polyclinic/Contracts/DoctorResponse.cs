namespace Polyclinic.Contracts
{
    public record DoctorResponse(
        Guid Id,
        string Surname,
        string Name,
        string Patronymic,
        string ReceptionHours,
        Guid Region_Id,
        string TitleRegion,
        Guid Department_Id,
        string TitleDepartment);
}
