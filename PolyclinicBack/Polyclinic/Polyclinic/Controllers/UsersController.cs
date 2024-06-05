using Microsoft.AspNetCore.Mvc;
using Polyclinic.Application.Services;
using Polyclinic.Contracts;
using Polyclinic.Core.Models;

namespace Polyclinic.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly IUsersService usersService;

        public UsersController(IUsersService userService)
        {
            this.usersService = userService;
        }

        [HttpPost("authorization")]
        public async Task<ActionResult<string>> GetUserToken([FromBody] UserRequest request)
        {
            var user = new User(
                Guid.NewGuid(),
                request.Login,
                request.Password,
                request.Surname,
                request.Name, 
                request.Patronymic,
                request.Email);
            var token = await usersService.Login(user);

            HttpContext.Response.Cookies.Append("cookie", token);

            var tok = new Tok();
            tok.Token = token;
            tok.Id = 1;

            return Ok(tok);
        }

        [HttpPost("register")]
        public async Task<ActionResult<Guid>> Register([FromBody] RegisterRequest request)
        {
            var user = new User(
                Guid.NewGuid(),
                request.Login,
                request.Password,
                request.Surname,
                request.Name,
                request.Patronymic,
                request.Email);

            await usersService.Register(user);
            return Ok(user.Login);
        }

        [HttpGet]
        public async Task<ActionResult<List<UserResponse>>> GetUsers()
        {
            var users = await usersService.GetAllUsers();

            var responce = users.Select(u => new UserResponse(u.Id, u.Login, u.Password, u.Surname, u.Name, u.Patronymic, u.Email));

            return Ok(responce);
        }

        [HttpPost]
        public async Task<ActionResult<Guid>> CreateUser([FromBody] UserRequest request)
        {
            var user = new User(Guid.NewGuid(), request.Login, request.Password, request.Surname, request.Name, request.Patronymic, request.Email);

            var userId = await usersService.CreateUser(user);

            return Ok(userId);
        }

        [HttpPut("{id:guid}")]
        public async Task<ActionResult<Guid>> UpdateUser(Guid id, [FromBody] UserRequest request)
        {
            var userId = await usersService.UpdateUser(id, request.Login, request.Password, request.Surname, request.Name, request.Patronymic, request.Email);
            return Ok(userId);
        }

        [HttpDelete("{id:guid}")]
        public async Task<ActionResult<Guid>> DeleteUser(Guid id)
        {
            return Ok(await usersService.DeleteUser(id));
        }
    }
    public class Tok
    {
        public int Id { get; set; }
        public string Token { get; set; }
    }
}
