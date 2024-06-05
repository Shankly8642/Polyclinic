using Polyclinic.Core.Models;

namespace Polyclinic.DataAccess.Repositories
{
    public interface IUsersRepository
    {
        Task<Guid> Create(User user);
        Task<Guid> Delete(Guid id);
        Task<Guid> Update(Guid id, string login, string password, string surname, string name, string patronymic, string email);
        Task<string> GetLogin(string login);
        Task<List<User>> GetUsers();
    }
}