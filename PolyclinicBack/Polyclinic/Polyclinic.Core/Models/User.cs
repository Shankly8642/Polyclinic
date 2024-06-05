
namespace Polyclinic.Core.Models
{
    public class User
    {
        public User(Guid id, string login, string password, string surname, string name, string patronymic, string email)
        {
            Id = id;
            Login = login;
            Password = password;
            Surname = surname;
            Name = name;
            Patronymic = patronymic;
            Email = email;
        }

        public Guid Id { get; set; }
        public string Login { get; set; }
        public string Password { get; set; }
        public string Surname { get; set; }
        public string Name { get; set; }
        public string Patronymic { get; set; }
        public string Email { get; set; }

    }
}
