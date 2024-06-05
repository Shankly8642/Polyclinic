namespace Polyclinic.Contracts
{
    public record RegisterRequest(
        string Login,
        string Password,
        string Surname,
        string Name,
        string Patronymic,
        string Email);
}
