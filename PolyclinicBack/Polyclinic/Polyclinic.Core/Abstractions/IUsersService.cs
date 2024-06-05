using Polyclinic.Core.Models;

namespace Polyclinic.Application.Services
{
    public interface IUsersService
    {
        string Generate(string password);
        string GenerateToken(User user);
        Task<string> Login(User userLogin);
        Task<Guid> Register(User user);
        bool Verify(string password, string passwordHash);
        Task<List<User>> GetAllUsers();
        Task<Guid> CreateUser(User user);
        Task<Guid> UpdateUser(Guid id, string login, string password, string surname, string name, string patronymic, string email);
        Task<Guid> DeleteUser(Guid id);

    }
}