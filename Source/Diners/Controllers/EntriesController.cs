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
    public class EntriesController : ControllerBase
    {
        private readonly IDinersRepository _db;
        private readonly IMapper _mapper;

        public EntriesController(IDinersRepository db, IMapper mapper)
        {
            _mapper = mapper;
            _db = db;
        }

        // POST: api/Entries
        [HttpPost]
        public async Task<IActionResult> PostAsync([FromBody] PostEntryDto dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var entry = await _db.AddEntryAsync(_mapper.Map<Entry>(dto), dto.BucketId);

            var entryDto = _mapper.Map<EntryDto>(entry);

            return CreatedAtAction("PostAsync", new { id = entryDto.Id }, entryDto);
        }

        // POST: api/Entries/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAsync([FromRoute] string id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            await _db.RemoveEntryAsync(id);

            return NoContent();
        }
    }
}