namespace Polyclinic.Contracts
{
    public record UserRequest(
        string Login,
        string Password,
        string Surname,
        string Name,
        string Patronymic,
        string Email);
}
