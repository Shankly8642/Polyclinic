using Microsoft.AspNetCore.Mvc;
using Polyclinic.Application.Services;
using Polyclinic.Contracts;
using Polyclinic.Core.Models;

namespace Polyclinic.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AppointmentsController : ControllerBase
    {
        private readonly IAppointmentsService appointmentsService;

        public AppointmentsController(IAppointmentsService appointmentsService)
        {
            this.appointmentsService = appointmentsService;
        }

        [HttpGet]
        public async Task<ActionResult<List<AppointmentResponse>>> GetAppointments()
        {
            var appointments = await appointmentsService.GetAllAppointments();

            var responce = appointments.Select(a => new AppointmentResponse(a.Id, a.DateTime, a.PatientTurnOut, a.Result, a.Patient_Id, a.PatientSNP, a.Doctor_Id, a.DoctorSNP));

            return Ok(responce);
        }

        [HttpPost]
        public async Task<ActionResult<Guid>> CreateAppointment([FromBody] AppointmentRequest request)
        {
            var appointment = new Appointment(Guid.NewGuid(), request.DateTime, request.PatientTurnOut, request.Result, request.Patient_Id, request.Doctor_Id);

            var appointmentId = await appointmentsService.CreateAppointment(appointment);

            return Ok(appointmentId);
        }

        [HttpPut("{id:guid}")]
        public async Task<ActionResult<Guid>> UpdateAppointment(Guid id, [FromBody] AppointmentRequest request)
        {
            var appointmentId = await appointmentsService.UpdateAppointment(id, request.DateTime, request.PatientTurnOut, request.Result, request.Patient_Id, request.Doctor_Id);
            return Ok(appointmentId);
        }

        [HttpDelete("{id:guid}")]
        public async Task<ActionResult<Guid>> DeleteAppointment(Guid id)
        {
            return Ok(await appointmentsService.DeleteAppointment(id));
        }
    }
}
