using Microsoft.AspNetCore.Mvc;
using Polyclinic.Application.Services;
using Polyclinic.Contracts;
using Polyclinic.Core.Models;

namespace Polyclinic.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class RegionsController : ControllerBase
    {
        private readonly IRegionsService regionsService;

        public RegionsController(IRegionsService regionsService)
        {
            this.regionsService = regionsService;
        }

        [HttpGet]
        public async Task<ActionResult<List<RegionResponse>>> GetRegions()
        {
            var regions = await regionsService.GetAllRegions();

            var response = regions.Select(r => new RegionResponse(r.Id, r.Title));

            return Ok(response);
        }

        [HttpPost]
        public async Task<ActionResult<Guid>> CreateRegion([FromBody] RegionRequest request)
        {
            var (region, error) = Region.Create(
                Guid.NewGuid(),
                request.Title);

            if (!string.IsNullOrEmpty(error))
            {
                return BadRequest(error);
            }

            var regionId = await regionsService.CreateRegion(region);

            return Ok(regionId);
        }

        [HttpPut("{id:guid}")]
        public async Task<ActionResult<Guid>> UpdateRegions(Guid id, [FromBody] RegionRequest request)
        {
            var regionId = await regionsService.UpdateRegion(id, request.Title);

            return Ok(regionId);
        }

        [HttpDelete("{id:guid}")]
        public async Task<ActionResult<Guid>> DeleteRegion(Guid id)
        {
            return Ok(await regionsService.DeleteRegion(id));
        }
    }
}
