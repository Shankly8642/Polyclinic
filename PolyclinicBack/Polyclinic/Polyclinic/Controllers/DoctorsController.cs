using Microsoft.AspNetCore.Mvc;
using Polyclinic.Application.Services;
using Polyclinic.Contracts;
using Polyclinic.Core.Models;

namespace Polyclinic.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DoctorsController : ControllerBase
    {
        private readonly IDoctorsService doctorsService;

        public DoctorsController(IDoctorsService doctorsService)
        {
            this.doctorsService = doctorsService;
        }

        [HttpGet]
        public async Task<ActionResult<List<DoctorResponse>>> GetDoctors()
        {
            var doctors = await doctorsService.GetAllDoctors();

            var responce = doctors.Select(d => new DoctorResponse(d.Id, d.Surname, d.Name, d.Patronymic, d.ReceptionHours, d.Region_Id, d.TitleRegion, d.Department_Id, d.TitleDepartment));

            return Ok(responce);
        }

        [HttpPost]
        public async Task<ActionResult<Guid>> CreateDoctor([FromBody] DoctorRequest request)
        {
            var doctor = new Doctor(Guid.NewGuid(), request.Surname, request.Name, request.Patronymic, request.ReceptionHours, request.Region_Id, request.Department_Id);

            var doctorId = await doctorsService.CreateDoctor(doctor);

            return Ok(doctorId);
        }

        [HttpPut("{id:guid}")]
        public async Task<ActionResult<Guid>> UpdateDoctor(Guid id, [FromBody] DoctorRequest request)
        {
            var doctorId = await doctorsService.UpdateDoctor(id, request.Surname, request.Name, request.Patronymic, request.ReceptionHours, request.Region_Id, request.Department_Id);
            return Ok(doctorId);
        }

        [HttpDelete("{id:guid}")]
        public async Task<ActionResult<Guid>> DeleteDoctor(Guid id)
        {
            return Ok(await doctorsService.DeleteDoctor(id));
        }
    }
}
