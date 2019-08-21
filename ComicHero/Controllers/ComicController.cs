using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using ComicHero.Core.Entities;
using ComicHero.Core.Interfaces;
using ComicHero.Web.ApiModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ComicHero.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ComicController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IRepository _repository;

        public ComicController(IMapper mapper, IRepository repository)
        {
            _mapper = mapper;
            _repository = repository;
        }
        // GET: api/Comic
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/Comic/5
        [HttpGet("{id}", Name = "Get")]
        public string Get(int id)
        {
            return "value";
        }

        //// POST: api/Comic
        //[HttpPost]
        //public void Post([FromBody] string value)
        //{
        //}

        // POST: api/Comic
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] ComicDto comic)
        {
            var newComic = _mapper.Map<Comic>(comic);

            var newItem = await _repository.AddAsync(newComic);

            return Ok(_mapper.Map<ComicDto>(newItem));
        }

        // PUT: api/Comic/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
