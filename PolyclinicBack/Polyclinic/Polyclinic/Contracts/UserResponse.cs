namespace Polyclinic.Contracts
{
    public record UserResponse(
        Guid Id,
        string Login,
        string Password,
        string Surname,
        string Name,
        string Patronymic,
        string Email);
}