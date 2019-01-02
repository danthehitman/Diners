using AutoMapper;
using HL.Diners.Api.Dto;
using HL.Diners.Core.Data;
using HL.Diners.Core.Exceptions;
using HL.Diners.Core.Model;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CyclesController : ControllerBase
    {
        private readonly IDinersRepository _db;
        private readonly IMapper _mapper;

        public CyclesController(IDinersRepository db, IMapper mapper)
        {
            _mapper = mapper;
            _db = db;
        }

        // GET: api/Cycles
        [HttpGet]
        public async Task<IEnumerable<Cycle>> GetCycles()
        {
            return await _db.GetCyclesAsync();
        }

        // GET: api/Cycles/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetCycle([FromRoute] string id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var cycle = await _db.GetCycleAsync(id);

            if (cycle == null)
            {
                return NotFound();
            }

            return Ok(_mapper.Map<Cycle>(cycle));
        }

        [HttpGet("active")]
        public async Task<IActionResult> GetActiveCycle()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var cycle = await _db.GetActiveCycleByUserAsync("");

            if (cycle == null)
            {
                return NotFound();
            }

            return Ok(_mapper.Map<Cycle>(cycle));
        }

        // PUT: api/Cycles/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCycle([FromRoute] string id, [FromBody] CycleDto cycle)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != cycle.Id)
            {
                return BadRequest();
            }

            try
            {
                await _db.UpdateCycleAsync(_mapper.Map<Cycle>(cycle));
            }
            catch (DinersNotFoundException)
            {
                return NotFound();
            }

            return NoContent();
        }

        // POST: api/Cycles
        [HttpPost]
        public async Task<IActionResult> PostCycle([FromBody] PostCycleDto postCycleDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var cycle = await _db.AddCycleAsync(_mapper.Map<Cycle>(postCycleDto));

            var cycleDto = _mapper.Map<CycleDto>(cycle);

            return CreatedAtAction("GetCycle", new { id = cycleDto.Id }, cycleDto);
        }

        // DELETE: api/Cycles/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCycle([FromRoute] string id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            await _db.RemoveCycleAsync(id);

            return Ok();
        }
    }
}