
using Microsoft.EntityFrameworkCore;
using Polyclinic.Core.Models;
using Polyclinic.DataAccess.Entites;

namespace Polyclinic.DataAccess.Repositories
{
    public class UsersRepository : IUsersRepository
    {
        private readonly PolyclinicDbContext context;

        public UsersRepository(PolyclinicDbContext context)
        {
            this.context = context;
        }

        public async Task<Guid> Create(User user)
        {
            var userEntity = new UserEntity
            {
                Id = user.Id,
                Login = user.Login,
                Password = user.Password,
                Surname = user.Surname,
                Name = user.Name,
                Patronymic = user.Patronymic,
                Email = user.Email
            };
            await context.Users.AddAsync(userEntity);
            await context.SaveChangesAsync();

            return userEntity.Id;
        }

        public async Task<string> GetLogin(string login)
        {
            var userEntity = await context.Users.AsNoTracking().FirstOrDefaultAsync(u => u.Login == login) ?? throw new Exception();

            var userPassword = userEntity.Password;
            return userPassword;
        }

        public async Task<List<User>> GetUsers()
        {
            var usersEntities = await context.Users.
                AsNoTracking()
                .ToListAsync();

            var users = usersEntities.Select(u => new User(u.Id, u.Login, u.Password, u.Surname, u.Name, u.Patronymic, u.Email)).ToList();
            return users;
        }

        public async Task<Guid> Update(Guid id, string login, string password, string surname, string name, string patronymic, string email)
        {
            await context.Users
                .Where(u => u.Id == id)
                .ExecuteUpdateAsync(s => s
                .SetProperty(u => u.Login, u => login)
                .SetProperty(u => u.Password, u => password)
                .SetProperty(u => u.Login, u => surname)
                .SetProperty(u => u.Password, u => name)
                .SetProperty(u => u.Login, u => patronymic)
                .SetProperty(u => u.Password, u => email));
            return id;
        }

        public async Task<Guid> Delete(Guid id)
        {
            await context.Users
                .Where(p => p.Id == id).ExecuteDeleteAsync();
            return id;
        }
    }
}
