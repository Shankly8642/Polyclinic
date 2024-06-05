
using Microsoft.IdentityModel.Tokens;
using Polyclinic.Core.Models;
using Polyclinic.DataAccess.Repositories;
using System.IdentityModel.Tokens.Jwt;
using System.Text;

namespace Polyclinic.Application.Services
{
    public class UsersService(IUsersRepository userRepository) : IUsersService
    {
        private readonly IUsersRepository _userRepository = userRepository;
        private readonly string secretKey = "zhendoszhendoszhendoszhendoszhendoszhendoszhendoszhendoszhendoszhendoszhendoszhendoszhendoszhendos";

        public string Generate(string password) =>
            BCrypt.Net.BCrypt.EnhancedHashPassword(password);

        public string GenerateToken(User user)
        {
            ArgumentNullException.ThrowIfNull(user);

            var singningCredentials = new SigningCredentials(
                new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey)),
                SecurityAlgorithms.HmacSha256
                );

            var token = new JwtSecurityToken(

                signingCredentials: singningCredentials
                );
            var tokenValue = new JwtSecurityTokenHandler().WriteToken(token);
            return tokenValue;
        }

        public async Task<Guid> Register(User user)
        {
            user.Password = Generate(user.Password);

            return await _userRepository.Create(user);
        }

        public async Task<string> Login(User userLogin)
        {
            var userPassword = await _userRepository.GetLogin(userLogin.Login);

            var result = Verify(userLogin.Password, userPassword);
            if (result == false)
            {
                throw new Exception("Неверный пароль");
            }
            var token = GenerateToken(userLogin);

            return token;
        }

        public bool Verify(string password, string passwordHash)
        {
            return BCrypt.Net.BCrypt.EnhancedVerify(password, passwordHash);
        }

        public async Task<List<User>> GetAllUsers()
        {
            return await _userRepository.GetUsers();
        }

        public async Task<Guid> CreateUser(User user)
        {
            return await _userRepository.Create(user);
        }

        public async Task<Guid> UpdateUser(Guid id, string login, string password, string surname, string name, string patronymic, string email)
        {
            return await _userRepository.Update(id, login, password, surname, name, patronymic, email);
        }

        public async Task<Guid> DeleteUser(Guid id)
        {
            return await _userRepository.Delete(id);
        }
    }
}
