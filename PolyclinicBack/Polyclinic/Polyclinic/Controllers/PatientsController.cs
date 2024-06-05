using Microsoft.AspNetCore.Mvc;
using Polyclinic.Application.Services;
using Polyclinic.Contracts;
using Polyclinic.Core.Models;

namespace Polyclinic.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PatientsController : ControllerBase
    {
        private readonly IPatientsService patientsService;

        public PatientsController(IPatientsService patientsService)
        {
            this.patientsService = patientsService;
        }

        [HttpGet]
        public async Task<ActionResult<List<PatientResponse>>> GetPatients()
        {
            var patients = await patientsService.GetAllPatients();

            var responce = patients.Select(p => new PatientResponse(p.Id, p.Surname, p.Name, p.Patronymic, p.DateBirth, p.Region_Id, p.TitleRegion));

            return Ok(responce);
        }

        [HttpPost]
        public async Task<ActionResult<Guid>> CreatePatient([FromBody] PatientRequest request)
        {
            var patient = new Patient(Guid.NewGuid(), request.Surname, request.Name, request.Patronymic, request.DateBirth, request.Region_Id);

            var patientId = await patientsService.CreatePatient(patient);

            return Ok(patientId);
        }

        [HttpPut("{id:guid}")]
        public async Task<ActionResult<Guid>> UpdatePatient(Guid id, [FromBody] PatientRequest request)
        {
            var patientId = await patientsService.UpdatePatient(id, request.Surname, request.Name, request.Patronymic, request.DateBirth, request.Region_Id);
            return Ok(patientId);
        }

        [HttpDelete("{id:guid}")]
        public async Task<ActionResult<Guid>> DeletePatient(Guid id)
        {
            return Ok(await patientsService.DeletePatient(id));
        }
    }
}
