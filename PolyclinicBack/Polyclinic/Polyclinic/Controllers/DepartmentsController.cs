using Microsoft.AspNetCore.Mvc;
using Polyclinic.Application.Services;
using Polyclinic.Contracts;
using Polyclinic.Core.Models;

namespace Polyclinic.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DepartmentsController : ControllerBase
    {
        private readonly IDepartmentsService departmentsService;

        public DepartmentsController(IDepartmentsService departmentsService)
        {
            this.departmentsService = departmentsService;
        }

        [HttpGet]
        public async Task<ActionResult<List<DepartmentResponse>>> GetDepartments()
        {
            var departments = await departmentsService.GetAllDepartments();

            var response = departments.Select(d => new DepartmentResponse(d.Id, d.Title));

            return Ok(response);
        }

        [HttpPost]
        public async Task<ActionResult<Guid>> CreateDepartment([FromBody] DepartmentRequest request)
        {
            var (department, error) = Department.Create(
                Guid.NewGuid(),
                request.Title);

            if (!string.IsNullOrEmpty(error) )
            {
                return BadRequest(error);
            }

            var departmentId = await departmentsService.CreateDepartment(department);

            return Ok(departmentId);
        }

        [HttpPut("{id:guid}")]
        public async Task<ActionResult<Guid>> UpdateDepartments(Guid id, [FromBody] DepartmentRequest request)
        {
            var departmentId = await departmentsService.UpdateDepartment(id,request.Title);

            return Ok(departmentId);
        }

        [HttpDelete("{id:guid}")]
        public async Task<ActionResult<Guid>> DeleteDepartment(Guid id)
        {
            return Ok(await departmentsService.DeleteDepartment(id));
        }
    }
}
