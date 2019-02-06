using AutoMapper;
using HL.Diners.Api.Dto;
using HL.Diners.Core.Data;
using HL.Diners.Core.Model;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BucketsController : ControllerBase
    {
        private readonly IDinersRepository _db;
        private readonly IMapper _mapper;

        public BucketsController(IDinersRepository db, IMapper mapper)
        {
            _mapper = mapper;
            _db = db;
        }

        // POST: api/Buckets
        [HttpPost]
        public async Task<IActionResult> PostAsync([FromBody] PostBucketDto dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var entry = await _db.AddBucketAsync(_mapper.Map<Bucket>(dto), dto.CycleId);

            var entryDto = _mapper.Map<BucketDto>(entry);

            return CreatedAtAction("PostAsync", new { id = entryDto.Id }, entryDto);
        }
    }
}