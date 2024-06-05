namespace Polyclinic.Contracts
{
    public record PatientRequest(
        string Surname, 
        string Name, 
        string Patronymic,
        DateTime DateBirth, 
        Guid Region_Id);
}
